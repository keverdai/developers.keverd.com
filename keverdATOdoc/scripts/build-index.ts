import "dotenv/config";
import {
  Document,
  VectorStoreIndex,
  storageContextFromDefaults,
  Settings,
  SentenceSplitter,
} from "llamaindex";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { HuggingFaceEmbedding } from "@llamaindex/huggingface";
import * as fs from "fs";
import * as path from "path";

// Configuration
const CONFIG = {
  docsPath: "./docs",
  storageDir: "./storage",
  chunkSize: 512,
  chunkOverlap: 50,
  embeddingModel: "BAAI/bge-small-en-v1.5",
};

/**
 * Initialize LlamaIndex settings
 */
function initializeSettings() {
 
  Settings.embedModel = new HuggingFaceEmbedding({
    modelType: CONFIG.embeddingModel,
  });

  Settings.nodeParser = new SentenceSplitter({
    chunkSize: CONFIG.chunkSize,
    chunkOverlap: CONFIG.chunkOverlap,
  });

  console.log("Settings initialized");
}

/**
 * Load and preprocess documents
 */
async function loadDocuments(): Promise<Document[]> {
  console.log(`Loading documents from ${CONFIG.docsPath}...`);

  if (!fs.existsSync(CONFIG.docsPath)) {
    throw new Error(`Documentation path not found: ${CONFIG.docsPath}`);
  }

  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData(CONFIG.docsPath);

  console.log(`✓ Loaded ${documents.length} documents`);

  // Add metadata to documents
  documents.forEach((doc, index) => {
    const metadata = doc.metadata || {};
    
    // Extract filename and path info
    if (metadata.file_path) {
      const filePath = metadata.file_path as string;
      metadata.filename = path.basename(filePath);
      metadata.directory = path.dirname(filePath);
      
      // Extract version from path if present
      const versionMatch = filePath.match(/version-([^/]+)/);
      if (versionMatch) {
        metadata.version = versionMatch[1];
      }
    }
    
    doc.metadata = metadata;
  });

  return documents;
}

/**
 * Build and persist the vector store index
 */
async function buildIndex() {
  try {
    console.log("Starting index build process...\n");

    // Initialize settings
    initializeSettings();

    // Load documents
    const documents = await loadDocuments();

    if (documents.length === 0) {
      throw new Error("No documents found to index");
    }

    // Create storage context
    console.log("Creating storage context...");
    const storageContext = await storageContextFromDefaults({
      persistDir: CONFIG.storageDir,
    });

    // Build index
    console.log("Building vector store index...");
    const startTime = Date.now();

    const index = await VectorStoreIndex.fromDocuments(documents, {
      storageContext,
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✓ Index built in ${duration}s`);

    console.log(`\nIndex successfully saved to ${CONFIG.storageDir}`);
    console.log(`Total documents indexed: ${documents.length}`);

    return index;
  } catch (error) {
    console.error("Error building index:", error);
    throw error;
  }
}

/**
 * Verify the index was saved correctly
 */
async function verifyIndex() {
  const requiredFiles = ["docstore.json", "index_store.json", "vector_store.json"];
  const missingFiles = requiredFiles.filter(
    (file) => !fs.existsSync(path.join(CONFIG.storageDir, file))
  );

  if (missingFiles.length > 0) {
    console.warn(`Warning: Missing index files: ${missingFiles.join(", ")}`);
  } else {
    console.log("✓ Index verification passed");
  }
}

// Main execution
buildIndex()
  .then(async () => {
    await verifyIndex();
    console.log("\nIndexing complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\nIndexing failed:", error.message);
    process.exit(1);
  });

export { buildIndex, CONFIG };