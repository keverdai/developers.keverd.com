require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const {
  VectorStoreIndex,
  storageContextFromDefaults,
  Settings,
} = require('llamaindex');
const { HuggingFaceEmbedding } = require('@llamaindex/huggingface');
const Groq = require('groq-sdk').default;

// Initialize HuggingFace embeddings (local & free)
Settings.embedModel = new HuggingFaceEmbedding({
  modelType: 'BAAI/bge-small-en-v1.5',
});

// LlamaIndex Groq LLM for query engine — only enabled when GROQ API key is present.
const { Groq: GroqLLM } = require('@llamaindex/groq');

function readGroqApiKey() {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim()) {
    return process.env.GROQ_API_KEY.trim();
  }

  const keyFile = process.env.GROQ_API_KEY_FILE;
  if (keyFile && fs.existsSync(keyFile)) {
    try {
      return fs.readFileSync(keyFile, 'utf8').trim();
    } catch (e) {
      console.warn('Unable to read GROQ_API_KEY_FILE:', e.message);
    }
  }

  return null;
}

const GROQ_API_KEY = readGroqApiKey();
if (GROQ_API_KEY) {
  Settings.llm = new GroqLLM({
    model: 'llama-3.3-70b-versatile',
    apiKey: GROQ_API_KEY,
    temperature: 0.2,
  });
} else {
  console.warn(
    '\n⚠️  GROQ_API_KEY is not set. Groq LLM features will be disabled.'
  );
  Settings.llm = null;
}

const app = express();
app.use(cors());
app.use(express.json());

let index = null;
let groq = null;
if (GROQ_API_KEY) {
  groq = new Groq({ apiKey: GROQ_API_KEY });
}

async function getIndex() {
  if (index) return index;

  console.log('Loading KeverdAI documentation index...');

  const storagePath = path.resolve(__dirname, '..', 'storage');
  console.log('Storage path:', storagePath);

  if (!fs.existsSync(storagePath)) {
    throw new Error(`Storage directory not found at: ${storagePath}`);
  }

  // Check if storage files exist
  const requiredFiles = [
    'doc_store.json',
    'index_store.json',
    'vector_store.json',
  ];
  for (const file of requiredFiles) {
    const filePath = path.join(storagePath, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Missing storage file: ${file}. Please run: ts-node scripts/build-index.ts`
      );
    }
  }

  const storageContext = await storageContextFromDefaults({
    persistDir: storagePath,
  });

  index = await VectorStoreIndex.init({
    storageContext,
  });

  console.log('✓ Index loaded!');
  return index;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message required' });
    }

    console.log('Query:', message);

    // Get the index
    const vectorIndex = await getIndex();

    // Only create a full query engine when an LLM is configured — otherwise
    // skip asQueryEngine (it will attempt to use Settings.llm and throw if
    // the LLM isn't present). We still create a retriever for retrieval-only
    // scenarios.
    let queryEngine = null;
    if (GROQ_API_KEY) {
      queryEngine = vectorIndex.asQueryEngine({
        retriever: vectorIndex.asRetriever({ similarityTopK: 5 }),
      });
    } else {
      console.log('LLM not configured — starting in retrieval-only mode');
    }

    // Retrieve nodes directly from the retriever
    const retriever = vectorIndex.asRetriever({
      similarityTopK: 5,
    });

    console.log('Retrieving relevant documents...');
    let nodes;
    try {
      nodes = await retriever.retrieve({
        query: message,
      });
    } catch (err) {
      console.error('Retrieval error:', err);
      // Fallback: try alternative retrieval method
      nodes = await vectorIndex.asRetriever().retrieve(message);
    }

    console.log(`Found ${nodes.length} relevant documents`);

    if (!nodes || nodes.length === 0) {
      return res.json({
        response:
          "I couldn't find relevant information in the KeverdAI documentation for that question. Please try rephrasing or ask about KeverdAI features, API usage, or setup instructions.",
        sources: [],
      });
    }

    // Build context from retrieved documents
    const context = nodes
      .map((node, idx) => {
        const text = node.node?.text || node.text || '';
        return `[Document ${idx + 1}]\n${text}`;
      })
      .join('\n\n---\n\n');

    if (!groq) {
      return res.status(503).json({
        error:
          'LLM/generation not available - GROQ_API_KEY is not configured. Provide a key to enable generation.',
      });
    }

    console.log('Generating response with Groq...');

    // Generate response with Groq
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are KeverdAI Assistant, an expert on the KeverdAI SDK documentation.

Answer questions using ONLY the provided documentation context. Be accurate, professional, and helpful. Include code examples when relevant.

Documentation Context:
${context}`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 1024,
    });

    const response = completion.choices[0].message.content;

    console.log('✓ Response generated');

    res.json({
      response: response,
      sources: nodes.map((node, idx) => {
        const nodeData = node.node || node;
        return {
          index: idx + 1,
          text: (nodeData.text || '').substring(0, 200) + '...',
          score: node.score?.toFixed(3) || 'N/A',
          metadata: nodeData.metadata || {},
        };
      }),
    });
  } catch (err) {
    console.error('Query error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({
      error: 'Sorry, something went wrong.',
      details: err.message,
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    embeddings: 'HuggingFace (local)',
    llm: 'Groq (cloud)',
    hasApiKey: !!GROQ_API_KEY,
    indexLoaded: !!index,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`\n🚀 KeverdAI Chat Backend running on http://localhost:${PORT}`);
  console.log('→ HuggingFace embeddings (local) + Groq LLM (cloud)');
  console.log('→ 100% free tier compatible!\n');
});
