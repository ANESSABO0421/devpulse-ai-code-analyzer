# DevPulse

DevPulse is a full-stack AI-powered code review and collaboration workspace.

## Monorepo

- `frontend/` - Next.js App Router client
- `backend/` - Express + TypeScript API and Socket.io server

## Local setup

1. Create `frontend/.env.local` with the frontend variables from the project spec.
2. Create `backend/.env` with the backend variables from the project spec.
3. Install dependencies in both apps.
4. Run `npm run dev` in `backend/` and `frontend/`.

## Core features

- JWT auth plus GitHub OAuth
- Project workspaces and member management
- AI-generated code reviews with Claude
- Live threaded comments with Socket.io
- Issue tracking linked to reviews
- GitHub file import into new review drafts
