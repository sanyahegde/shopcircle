# shopcircle

a minimal storefront for creators. save products from anywhere, organize into collections and share with your audience

---

## tech stack

- **frontend** — react, tailwindcss
- **backend** — node.js, express
- **database** — postgresql
- **ai/ml** — openai api (embeddings + recommendations)
- **deployment** — vercel (frontend), railway (backend + db)

---

## features

- save products from any url (amazon, target, etc.)
- organize into collections
- shareable profile at `shopcircle.app/@username`
- ai-powered "you might also like" recommendations
- discover similar creators
- analytics on what your audience clicks

---

## getting started

### prerequisites
- node.js 18+
- postgresql 14+
- openai api key

### setup

```bash
# clone the repo
git clone https://github.com/yourusername/shopcircle.git
cd shopcircle

# backend
cd backend
cp .env.example .env
npm install
npm run dev

# frontend (new terminal)
cd frontend
npm install
npm start
```

### environment variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/shopcircle
JWT_SECRET=your_secret_here
OPENAI_API_KEY=sk-your-key-here
PORT=5000
```

---

## project structure

```
shopcircle/
├── backend/
│   ├── routes/        # api endpoints
│   ├── controllers/   # business logic
│   ├── middleware/    # auth, error handling
│   └── utils/         # scraper, openai helpers
├── frontend/
│   ├── src/
│   │   ├── pages/     # main views
│   │   ├── components/# reusable ui
│   │   └── utils/     # api calls
└── database_schema.sql


```
<img width="1440" height="810" alt="Screenshot 2026-02-16 at 11 26 47 PM" src="https://github.com/user-attachments/assets/9b376fe7-651c-4c11-8a53-1c631fc89b58" />

---

## license

mit
