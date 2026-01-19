# 📅 Event Registration Management System

A **Full Stack Event Registration Management System** that allows users to register for events and organizers to create and manage events with strict capacity constraints.  
The system enforces **JWT-based authentication**, **role-based access control**, and **database persistence**.

---

## 🔗 Live Deployment Links

- **Frontend (Vercel)**  
  https://event-registration-system-ashen.vercel.app

- **Backend (Render)**  
  https://event-registration-system-60cz.onrender.com

---

## 📌 Project Overview

This project is developed as part of a **Full Stack Assignment**.

It demonstrates:
- Secure authentication using JWT
- Role-based dashboards for USER and ORGANIZER
- Event creation with capacity limits
- Automatic closure of event registration when capacity is reached
- End-to-end integration between frontend, backend, and database

> UI design is minimal; focus is on logic, correctness, and constraint handling.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Basic CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

### Tools & Platforms
- Postman (API testing)
- GitHub (version control)
- Vercel (frontend deployment)
- Render (backend deployment)

---

## 👥 User Roles & Permissions

### USER
- Register and login
- View available events
- Register for events (if capacity allows)
- View own registration status

### ORGANIZER
- Login
- Create events with capacity limits
- View events created by them
- View registrations for each event

---

## 🔐 Authentication & Authorization

- JWT-based authentication is implemented
- All protected APIs require a valid JWT token
- Role-based access control enforced on backend routes
- JWT token is sent via HTTP header:

