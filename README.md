# 🎯 Interview Trainer AI

A modern, AI-powered interview preparation chatbot built with **Next.js**, **Langflow**, and **IBM Granite** (via RAG). It delivers personalized, role-specific interview coaching through a clean chat interface.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss)
![Langflow](https://img.shields.io/badge/Langflow-Powered-orange)

---

## ✨ Features

- **Profile-based personalization** — users enter their name, experience level, and target role before starting
- **AI-powered Q&A** — real-time responses from a Langflow RAG pipeline backed by IBM Granite
- **Role-tailored coaching** — context-aware questions covering technical, behavioral, HR, and soft-skill domains
- **Quick prompt shortcuts** — one-click starters like "Give me common interview questions"
- **Streaming loading indicator** — animated typing dots while the AI responds
- **Session reset** — start a fresh session without refreshing the page
- **Dark/light theme** — via `next-themes`
- **Fully responsive** — works on desktop and mobile

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS + shadcn/ui + Radix UI |
| AI Backend | [Langflow](https://langflow.org/) with IBM Granite (RAG) |
| Icons | Lucide React |
| Forms | react-hook-form + Zod |
| Analytics | @vercel/analytics |
| Package Manager | npm / pnpm |

---

## 📁 Project Structure

```
interview-trainer-chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # API route — proxies messages to Langflow
│   ├── globals.css             # Global styles + Tailwind base
│   ├── layout.tsx              # Root layout with theme provider
│   └── page.tsx                # Home page — profile gate + chat view
│
├── components/
│   ├── chat-interface.tsx      # Chat window with messages, input, quick prompts
│   ├── chat-message.tsx        # Individual message bubble (user / assistant)
│   ├── profile-form.tsx        # Onboarding form (name, experience, role)
│   ├── theme-provider.tsx      # next-themes wrapper
│   └── ui/                     # shadcn/ui component library
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/
│   └── utils.ts                # Tailwind class merge helper
│
├── public/                     # Static assets / icons
│
├── .env.example                # Environment variable template
├── next.config.mjs
├── tailwind.config.*
└── tsconfig.json
```

---

## ⚙️ How It Works

```
User fills profile
       ↓
ChatInterface sends { message, profile } to /api/chat
       ↓
Next.js API route attaches profile context and forwards to Langflow
       ↓
Langflow RAG pipeline queries IBM Granite knowledge base
       ↓
AI response is extracted and returned to the browser
       ↓
ChatMessage renders the reply
```

The profile context is prepended to every message in this format:
```
[User Profile: Name: Alice, Experience: 1-2 Years, Role: Software Engineer]

User: Give me common interview questions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **pnpm**
- A running **Langflow** instance with a configured flow (see [Langflow Setup](#langflow-setup))

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interview-trainer-chatbot.git
cd interview-trainer-chatbot
```

### 2. Install dependencies

```bash
# Using npm
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```env
# Required — full URL to your Langflow flow endpoint
LANGFLOW_API_ENDPOINT=http://localhost:7860/api/v1/run/YOUR_FLOW_ID_HERE

# Optional — only needed if your Langflow instance has auth enabled
LANGFLOW_API_KEY=your-langflow-api-key
```

> ⚠️ `LANGFLOW_API_ENDPOINT` must be a **complete URL** (including `http://`). The app validates this at runtime and will return a clear error message if it's missing or malformed.

---

### 4. Start the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Langflow Setup

This app requires a **Langflow** instance running a RAG flow powered by IBM Granite.

1. Install and start Langflow:
   ```bash
   pip install langflow
   langflow run
   # Langflow starts at http://localhost:7860
   ```

2. In the Langflow UI, create a new flow using IBM Granite as your LLM with a RAG chain (document loader → vector store → retriever → chat model).

3. Get your **Flow ID** from the flow's API endpoint URL and paste it into `LANGFLOW_API_ENDPOINT`:
   ```
   http://localhost:7860/api/v1/run/<YOUR_FLOW_ID>
   ```

4. If your Langflow instance requires authentication, set `LANGFLOW_API_KEY` as well. To bypass auth locally, you can enable `LANGFLOW_SKIP_AUTH_AUTO_LOGIN` in Langflow's settings.

---

## 🌐 Deployment

### Vercel (recommended)

1. Push to GitHub.
2. Import the repo in [Vercel](https://vercel.com/).
3. Add environment variables in **Project Settings → Environment Variables**:
   - `LANGFLOW_API_ENDPOINT`
   - `LANGFLOW_API_KEY` (if required)
4. Deploy.

> Your Langflow backend must be publicly accessible from Vercel's servers. Use a cloud-deployed Langflow instance or a tunnel like [ngrok](https://ngrok.com/) for local testing.

### Docker / Self-hosted

```bash
npm run build
npm run start
# App runs on port 3000 by default
```

---

## 📋 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔑 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `LANGFLOW_API_ENDPOINT` | ✅ Yes | Full URL to the Langflow `/api/v1/run/<flow-id>` endpoint |
| `LANGFLOW_API_KEY` | ❌ Optional | Bearer token for Langflow instances with auth enabled |

---

## 🧩 Key Components

### `ProfileForm`
Onboarding step that collects:
- **Name** (text input)
- **Experience level** (dropdown: Fresher, 1–2 Years, 3–5 Years, 5–10 Years, 10+ Years)
- **Target role** (free text, e.g., "Software Engineer")

### `ChatInterface`
The main chat window featuring:
- Scrollable message list with auto-scroll to latest
- Animated loading indicator while waiting for AI
- Quick-prompt chips shown on first load
- Text input with submit button
- "New Session" button to reset the profile

### `ChatMessage`
Renders each message bubble with distinct styling for `user` vs `assistant` roles.

### `app/api/chat/route.ts`
Server-side API handler that:
1. Validates the Langflow endpoint URL
2. Prepends user profile context to the message
3. Forwards the request to Langflow with optional auth headers
4. Parses the Langflow response from multiple possible response shapes
5. Returns the AI message as JSON

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| `"Langflow API endpoint not configured"` | Set `LANGFLOW_API_ENDPOINT` in `.env.local` |
| `"Invalid LANGFLOW_API_ENDPOINT"` | The value must be a full URL starting with `http://` or `https://` |
| `403 from Langflow` | Check `LANGFLOW_API_KEY` or enable `LANGFLOW_SKIP_AUTH_AUTO_LOGIN` in Langflow |
| Empty / no AI response | Verify your Langflow flow is running and the flow ID is correct |
| Port conflict on 3000 | Run `npm run dev -- -p 3001` to use a different port |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push and open a Pull Request

---

## 📄 License

**MIT LICENSE**

---

## 🙏 Acknowledgements

- [Langflow](https://langflow.org/) — visual LLM pipeline builder
- [IBM Granite](https://www.ibm.com/granite) — foundation model for RAG
- [shadcn/ui](https://ui.shadcn.com/) — accessible component library
- [Vercel](https://vercel.com/) — deployment platform
