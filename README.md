# 🌍 Wanderlust Frontend

The **Wanderlust Frontend** is a modern **Next.js** application for the **Wanderlust** travel platform. It provides a responsive user interface for browsing travel destinations, managing bookings, and authenticating users securely with **Better Auth**.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React
- **Styling:** Tailwind CSS
- **Authentication:** Better Auth
- **UI Components:** HeroUI
- **Image Optimization:** Next.js Image Component

---

## 📁 Project Structure

```text
├── app/                     # App Router pages and layouts
├── components/              # Reusable UI components
├── lib/                     # Authentication and utility functions
├── public/                  # Static assets
├── .env.local               # Environment variables
├── .gitignore               # Ignored files and folders
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-frontend-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add the following:

```env
NEXT_PUBLIC_API_URL=http://localhost:5050
BETTER_AUTH_URL=http://localhost:3000
```

---

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## ✨ Features

- 🔐 Secure authentication with Better Auth
- 🌍 Browse travel destinations
- 📍 View destination details
- 🧳 Book travel destinations
- 📖 Manage personal bookings
- ✏️ Create, update, and delete destinations (authorized users)
- 📱 Fully responsive design
- ⚡ Fast navigation with Next.js App Router

---

## 📦 Environment Variables

| Variable              | Description                 |
| --------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL             |
| `BETTER_AUTH_URL`     | Better Auth application URL |

---

## ☁️ Deployment

This project is optimized for deployment on **Vercel**.

### Steps

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the project.

Make sure `NEXT_PUBLIC_API_URL` points to your deployed backend server.

---

## 🔗 Backend

This frontend communicates with the **Wanderlust Backend Server** through REST APIs for:

- User authentication
- Destination management
- Booking management
- User profile retrieval

---

## 📄 License

This project is intended for educational and personal portfolio purposes.
