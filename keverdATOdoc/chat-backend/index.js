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

// ADD this: LlamaIndex Groq LLM for query engine (fixes Settings.llm)
const { Groq: GroqLLM } = require('@llamaindex/groq');
Settings.llm = new GroqLLM({
  model: 'llama-3.3-70b-versatile',
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.2,
});

const app = express();
app.use(cors());
app.use(express.json());

let index = null;
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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

    // Create a query engine instead of retriever
    const queryEngine = vectorIndex.asQueryEngine({
      retriever: vectorIndex.asRetriever({
        similarityTopK: 5,
      }),
    });

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
    hasApiKey: !!process.env.GROQ_API_KEY,
    indexLoaded: !!index,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`\n🚀 KeverdAI Chat Backend running on http://localhost:${PORT}`);
  console.log('→ HuggingFace embeddings (local) + Groq LLM (cloud)');
  console.log('→ 100% free tier compatible!\n');
});
