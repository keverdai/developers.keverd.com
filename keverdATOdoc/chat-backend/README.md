# KeverdAI Chat Backend

The `chat-backend` is a tiny Express server used by the docs site for local testing and demos. It supports local embeddings (HuggingFace) and an optional Groq LLM for response generation.

Quick notes
- The server reads environment variables from a `.env` file (via `dotenv`) if present.
- To enable the LLM/Groq functionality you MUST set `GROQ_API_KEY` (or set `GROQ_API_KEY_FILE` to a file path containing the key).
- If `GROQ_API_KEY` is missing the server will still start and serve retrieval + health endpoints, but `/api/chat` will return 503 when trying to generate responses.

Running locally
1. Copy `.env.example` to `.env` and add your `GROQ_API_KEY` (or configure `GROQ_API_KEY_FILE`):

```bash
cp .env.example .env
# edit .env and fill in GROQ_API_KEY
```

2. Install dependencies (at repo root or in this folder) and start:

```bash
npm install
node index.js
```

If you do not provide a Groq API key the server will warn on startup but will not crash — this is intentional so developers can still test retrieval and index loading.
