
# 💼 Personal Portfolio - MERN Stack

This is a **personal portfolio website** built using the **MERN stack** (MongoDB, Express, React, Node.js). It showcases my skills, projects, resume, and contact information.

## 🚀 Features

- 🎨 Responsive UI/UX design
- 📁 Project showcase with live demos and GitHub links
- 📄 Resume download section
- 📫 Contact form integrated with backend API (Node.js + Nodemailer)
- 🌐 Deployment-ready (supports platforms like Render, Vercel, Netlify, etc.)

## 🛠 Tech Stack

**Frontend (React):**
- React JS
- Tailwind CSS / Bootstrap (based on your styling)
- React Router DOM
- Axios

**Backend (Node.js):**
- Node.js
- Express.js
- Nodemailer (for contact form)
- CORS
- dotenv

## 📁 Folder Structure

```

root
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
├── server/               # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── server.js
│   └── .env
├── package.json
└── README.md

````

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (if you're using DB for storing messages or project data)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/suraj126708/suraj-gitte.git
   cd your-portfolio
````

2. **Install frontend dependencies:**

   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**

   ```bash
   cd ../server
   npm install
   ```

4. **Environment Variables:**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

### Run the App

Start both client and server:

```bash
# From root directory, use concurrently or two terminals
cd client && npm start         # Runs React app on http://localhost:3000
cd server && npm run dev      # Runs Node server on http://localhost:5000
```

## 🌍 Deployment

You can deploy the frontend and backend separately:

* **Frontend**: Netlify, Vercel, GitHub Pages
* **Backend**: Render, Railway, Heroku

Make sure to update API URLs in React app for production.

## 📸 Screenshots

*Add screenshots of your home page, project section, contact form, etc.*

## 🙋‍♂️ Author

**Suraj Gitte ☀**

* [LinkedIn](https://www.linkedin.com/in/suraj-gitte)
* [GitHub](https://github.com/surajgitte)
* [Portfolio](suraj-gitte-portfolio.vercel.app)

