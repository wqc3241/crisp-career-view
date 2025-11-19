# Avatar Chat Testing Guide

## Overview
The avatar chat system uses OpenAI's embeddings and GPT models to answer questions about Qichao Wang's professional experience, using a RAG (Retrieval Augmented Generation) approach.

## Architecture

### Edge Functions
1. **chat-avatar** (`supabase/functions/chat-avatar/index.ts`)
   - Receives user queries
   - Generates embeddings using OpenAI
   - Searches the knowledge base for relevant context
   - Generates responses using GPT-4o-mini
   
2. **ingest-knowledge** (`supabase/functions/ingest-knowledge/index.ts`)
   - Processes career and side project data
   - Creates embeddings for each item
   - Stores in the `documents` table

### Database
- **documents table**: Stores text content, metadata, and vector embeddings
- **match_documents function**: Performs semantic similarity search using pgvector

### Frontend Components
- **AvatarChat** (`src/components/chat/AvatarChat.tsx`): Main dialog component
- **ChatInterface** (`src/components/chat/ChatInterface.tsx`): Chat UI
- **AvatarScene** (`src/components/chat/AvatarScene.tsx`): 3D avatar visualization
- **useAvatarChat** (`src/hooks/useAvatarChat.ts`): Chat state management

## Testing Steps

### Step 1: Initialize Knowledge Base
1. Navigate to `/admin` (you must be logged in as an admin)
2. Click on the "Knowledge Base" tab
3. Click "Ingest Knowledge Base" button
4. Wait for confirmation toast showing items were ingested
5. Expected result: "Successfully ingested X items into the knowledge base"

### Step 2: Test Chat Functionality
1. Go to the home page (`/`)
2. Click the "Talk to Me" button in the hero section
3. A dialog should open with:
   - Left side: 3D avatar scene
   - Right side: Chat interface with welcome message

### Step 3: Test Queries

Try these sample queries to verify the system works:

#### Basic Info Queries
- "What experience does Qichao have?"
- "Tell me about Qichao's background"
- "What companies has Qichao worked for?"

#### Company-Specific Queries
- "What did Qichao do at Lucid Motors?"
- "Tell me about the BlueSnap role"
- "What were Qichao's achievements at Harmony Plus?"

#### Side Project Queries
- "What side projects has Qichao built?"
- "Tell me about Cinely AI"
- "What is the Medical Bill RCM project?"

#### Technical Skills
- "What technical skills does Qichao have?"
- "Does Qichao have experience with AI?"
- "What technologies has Qichao worked with?"

### Expected Behavior

✅ **Working Correctly**:
- Responses are contextual and accurate
- Typing indicator shows while generating response
- Messages appear in chat history
- Scroll automatically goes to latest message
- Avatar pulses when "speaking"

❌ **Issues to Watch For**:
- Empty responses
- Generic "I don't know" answers when data exists
- Long response times (>10 seconds)
- Error messages in the chat
- Console errors

## Troubleshooting

### Knowledge Base Not Ingesting
- Check edge function logs: `/admin` → View edge function logs
- Verify OPENAI_API_KEY is set in Supabase secrets
- Check network tab for failed requests

### Chat Not Responding
1. Open browser console (F12)
2. Check for errors when sending messages
3. Verify edge function is being called
4. Check edge function logs for errors

### Poor Quality Responses
- Verify knowledge base was ingested successfully
- Check if `match_documents` is returning results
- Adjust `match_threshold` in chat-avatar function (currently 0.5)
- Increase `match_count` if more context is needed

## Monitoring

### Check Edge Function Logs
```sql
-- In Supabase SQL Editor or via supabase--analytics-query
SELECT 
  timestamp, 
  event_message, 
  metadata
FROM function_edge_logs
WHERE function_id = 'chat-avatar'
ORDER BY timestamp DESC
LIMIT 20;
```

### Check Documents Table
```sql
-- Verify documents were ingested
SELECT 
  id, 
  content, 
  metadata->>'type' as type,
  metadata->>'title' as title,
  created_at
FROM documents
ORDER BY created_at DESC;
```

### Test Vector Search
```sql
-- Test the match_documents function
-- Note: You'll need a real embedding vector here
SELECT * FROM match_documents(
  '[actual_embedding_vector]'::vector(1536),
  0.5,
  5
);
```

## Performance Benchmarks

- Knowledge ingestion: ~2-5 seconds per item
- Chat response time: 2-4 seconds
- Embedding generation: ~500ms
- Database vector search: <100ms

## Security Notes

- Edge functions use service role key for database access
- RLS policies allow public read on documents (for chat queries)
- Only authenticated users can insert/update documents
- OPENAI_API_KEY is stored as Supabase secret (never exposed to client)

## Next Steps for Enhancement

1. Add conversation history persistence
2. Implement streaming responses for better UX
3. Add voice input/output capabilities
4. Create admin interface for document management
5. Add analytics for chat usage
6. Implement rate limiting
7. Add support for document uploads (PDFs, etc.)
8. Create feedback mechanism for response quality
