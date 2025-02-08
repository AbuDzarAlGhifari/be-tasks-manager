
# 🍥 Task Mana BE  

**Task Mana BE** is a backend API for the **Task Manager** application built using **Express.js**. This repository provides a secure and scalable RESTful API for managing tasks, groups, and user authentication. This API is designed to support efficient task management in a collaborative environment.
## 🚀 Features

**Authentication & Authorization**
- User registration and login.
- JWT token-based authentication to secure API endpoints.

**Task Management**
- Add, edit, and delete tasks.

**Group Management & Collaboration**
- Create groups to organize tasks by project or team.
- Add and manage group members to support collaboration.

**RESTful API Endpoints**
- Provides various endpoints to access and manipulate task, group, and user data.


## 🛠 Installation

### Prerequisites

Ensure you have the following installed on your system:  
- [Node.js](https://nodejs.org/) (LTS version recommended)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AbuDzarAlGhifari/be-tasks-manager.git
   cd be-tasks-manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration:**
- Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
- Adjust the configuration in the `.env` file. Example configuration:
```dotenv
DB_HOST= 
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=
```

4. **Set Database**

   create a MySql database based on init.sql

5. **Running the Application:**
```bash
npm start
```

   The server will run on `http://localhost:5000`


    
## 👾 Sample Account / Test Account
Use the following account to test the app 

### Admin Account
- **Email:** admin@gmail.com
- **Password:** admin123

### User Account
- **Email:** gelas@gmail.com
- **Password:** gelas123
## 👌 API Reference

**Auth**
- Register (POST)
   ```bash
   https://api-task-liart.vercel.app/auth/register
   ```
- Login (POST)
   ```bash
   https://api-task-liart.vercel.app/auth/login
   ```
- Get Current User Info (GET)
   ```bash
   https://api-task-liart.vercel.app/auth/me
   ```
**Task**
- Create Task (POST)
   ```bash
   https://api-task-liart.vercel.app/tasks
   ```
- Get All Tasks (GET)
   ```bash
   https://api-task-liart.vercel.app/tasks
   ```
- Delete Task (DELETE)
   ```bash
   https://api-task-liart.vercel.app/tasks/{{taskId}}
   ```
- Update Task (PUT)
   ```bash
   https://api-task-liart.vercel.app/tasks/{{taskId}}
   ```
**Group**
- Create Group (POST)
   ```bash
   https://api-task-liart.vercel.app/groups
   ```
- Add Member to Group (POST)
   ```bash
   https://api-task-liart.vercel.app/groups/{{userId}}/members
   ```
- Create Group Task (POST)
   ```bash
   https://api-task-liart.vercel.app/tasks
   ```
- Get Group Tasks (GET)
   ```bash
   https://api-task-liart.vercel.app/groups/{{groupId}}/tasks
   ```
- Get Joined Groups (GET)
   ```bash
   https://api-task-liart.vercel.app/groups/joined
   ```
-  Get Group Members (GET)
   ```bash
   https://api-task-liart.vercel.app/groups/{{groupId}}/members
   ```
**Admin**
- [Admin] Get All Users (GET)
   ```bash
   https://api-task-liart.vercel.app/admin/users
   ```
- [Admin] Get All Tasks (GET)
   ```bash
   https://api-task-liart.vercel.app/admin/tasks
   ```
- [Admin] Update Any Task (PUT)
   ```bash
   https://api-task-liart.vercel.app/admin/tasks/{{taskId}}
   ```
- [Admin] Delete User (DELETE)
   ```bash
   https://api-task-liart.vercel.app/admin/tasks/{{taskId}}
   ```
- [Admin] Promote User (PATCH)
   ```bash
   https://api-task-liart.vercel.app/admin/users/{{userId}}/promote
   ```
- [Admin] Create Task for User (POST)
   ```bash
   https://api-task-liart.vercel.app/admin/tasks
   ```
## Tech Stack

   **Client:** React + Vite, TailwindCSS

   **Server:** Node, Express

   **DataBase:** MySql

