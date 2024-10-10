# User Management Application

This is a User Management application that allows users to sign up, log in, view their profiles, upload images, and update their usernames and emails. Additionally, it provides an admin dashboard to manage users, including the ability to add, edit, search, and delete user accounts.

## Features
![alt text](https://res.cloudinary.com/dfeem1brg/image/upload/v1728546615/Untitled_design_1_nyestg.png)

### User Features
- **Login/Signup:** Users can register and log in to their accounts.
- **Profile Management:** Users can view and update their profiles, including uploading images and changing their username and email.

### Admin Features
- **Admin Dashboard:** Admins can log in to a dedicated dashboard to manage users.
- **User Management:** 
  - List all users.
  - Search for specific users.
  - Add new users.
  - Edit existing user details.
  - Delete users.

## Technologies Used

### Frontend
- **React.js:** Framework for building user interfaces.
- **Shadcn Component Library:** UI components for a modern look and feel.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Zod:** TypeScript-first schema declaration and validation library.
- **Redux Toolkit:** State management library for managing application state.

### Backend
- **Express.js:** Web framework for building RESTful APIs.
- **JWT Authentication:** Secure authentication method using JSON Web Tokens.
- **TypeScript:** Strongly typed programming language to enhance JavaScript.

## Getting Started

To run the application, follow these steps:

### Prerequisites
- Node.js and npm installed on your machine.

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend.
   npm install
   npm run server
   ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```