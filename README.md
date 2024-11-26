# API Todo List

A simple Todo List application built with **Node.js** (backend) and **React.js** (frontend). This application supports user authentication with Firebase and offers two modes: **personal** and **multi-user**.

---

## Features

- User Registration and Login with Firebase Authentication.
- View, Create, Update, and Delete Todos.
- Multi-user mode associates todos with authenticated users.
- Personal mode allows todos without authentication.

---

## Installation

### Backend (Node.js)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/csarmientobaca/api_todo_list.git
   cd api_todo_list


# MongoDB Credentials
USERNAME_MONGO=your-mongo-username
PASS_MONGO=your-mongo-password

DB=todoApp

# Application Configurations
PORT=5000
TYPE=multi

# Firebase API Key
FIREBASE_API_KEY=your-firebase-api-key

# Firebase Service Account JSON (escaped for .env compatibility)
FIREBASE_SERVICE_ACCOUNT={
    "type": "service_account",
    "project_id": "your-firebase-project-id",
    "private_key_id": "your-private-key-id",
    "private_key": "-----BEGIN PRIVATE KEY-----\\n<key-content>\\n-----END PRIVATE KEY-----\\n",
    "client_email": "firebase-adminsdk@example.iam.gserviceaccount.com",
    ...
}
