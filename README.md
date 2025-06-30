# Next.js Blog App

A simple blog website with admin dashboard, blog content, MongoDB integration, and password-protected admin features.

## Features

- Public blog homepage with SEO-friendly URLs
- Admin dashboard for creating, editing, and deleting posts
- Password-protected admin access
- Clean, modern UI (vanilla CSS)
- Toast notifications for actions
- MongoDB Atlas integration

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd nextjs-blog-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Admin Access

- Go to `/admin` to access the dashboard.
- **Demo Admin Password:** `your_admin_password` (set in `.env.local`)

## Deployment

- Deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js.
- Set the same environment variables in your deployment dashboard.
