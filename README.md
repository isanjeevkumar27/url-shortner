# 🔗 URL Shortener

A modern URL Shortener web application built with **React.js**, **Supabase**, **Tailwind CSS**, and **Shadcn UI**. The application allows users to securely create, manage, and track shortened URLs with authentication and click analytics.

---

## ✨ Features

- 🔐 User Authentication (Supabase Auth)
- 🔗 Create and manage short URLs
- 📊 Click analytics and usage statistics
- 📱 Responsive and modern user interface
- ☁️ Cloud-based backend powered by Supabase
- 📈 Track URL performance
- 🗂️ Dashboard to manage created links
- ⚡ Fast client-side routing using React

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- Axios

### Backend & Database
- Supabase
  - Authentication
  - PostgreSQL Database
  - Storage

---

## 📂 Project Structure

```
url-shortner/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── db/
│   ├── layouts/
│   ├── assets/
│   └── lib/
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Features Implemented

### Authentication
- User Sign Up
- User Login
- Protected Routes
- Session Management using Supabase Auth

### URL Management
- Generate unique short URLs
- Store URLs in Supabase Database
- Redirect users using short links
- Manage all created URLs

### Analytics
- Track total clicks
- Monitor URL usage
- Display analytics through an intuitive dashboard

### User Interface
- Responsive design
- Clean and modern interface
- Built using Tailwind CSS and Shadcn UI components

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/isanjeevkumar27/url-shortner.git
```

```bash
cd url-shortner
```

---

### Install Dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## ▶️ Run the Project

```bash
npm run dev
```

Application will be available at:

```
http://localhost:5173
```


---

## 📈 

- Designed a relational database schema using Supabase PostgreSQL.
- Implemented secure authentication with Supabase Auth.
- Built a scalable URL shortening workflow with unique short-code generation.
- Developed click analytics and dashboard for monitoring URL performance.
- Created a responsive user interface using React.js, Tailwind CSS, and Shadcn UI.

---


## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sanjeev Kumar**

- GitHub: https://github.com/isanjeevkumar27