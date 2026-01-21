# Police Complaint Management System

A comprehensive, full-stack web application designed to streamline the process of lodging and managing police complaints. This system serves two main user roles: **Citizens (Victims)** and **Police Officers**, providing dedicated dashboards and featuring secure evidence management, case tracking, and a public search registry.

---

## 🚀 Features

### For Citizens (Victims):
- **Lodge Complaints**: Easy-to-use form to file complaints with category selection (Theft, Assault, Cybercrime, etc.).
- **Evidence Upload**: Securely upload images or documents related to the complaint.
- **Real-time Tracking**: Visual timeline to track the status of your complaint (Pending, Active, Closed).
- **Dashboard**: View summary statistics and a history of all your lodged complaints.

### For Police Officers:
- **Command Center Dashboard**: Overview of new, active, and closed cases with sorting and visual indicators.
- **Case Management**: specialized view to manage assigned cases, view victim details, and upload official evidence.
- **Summons**: Issue official summons to victims directly through the system.
- **Case Closure**: Workflow to close cases with mandatory remarks.

### Public Features:
- **Public Record Search**: Anyone can search for the status of a complaint using its Case ID (without viewing sensitive personal details).

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Databases**: 
  - **PostgreSQL**: For structured data (Users, Complaints, Stations) - managed via Prisma.
  - **MongoDB**: For flexible data (Timeline Updates, Evidence Logs) - managed via Mongoose.
- **Storage**: Local file system (for evidence uploads).

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

1.  **Node.js** (v18 or higher) - [Download Here](https://nodejs.org/)
2.  **PostgreSQL** (Database) - [Download Here](https://www.postgresql.org/download/)
3.  **MongoDB** (Database) - [Download Here](https://www.mongodb.com/try/download/community)
4.  **Git** (for cloning) - [Download Here](https://git-scm.com/downloads)

---

## ⚙️ Installation & Setup (The Easy Way)

We have included a verified automation script for Windows users.

1.  **Clone the Repository**:
    Open your terminal (Command Prompt or PowerShell) and run:
    ```bash
    git clone https://github.com/Tejasvi-hegde/Police_complaint_management.git
    cd Police_complaint_management
    ```

2.  **Configure Environment Variables**:
    You need to set up the connection strings for your databases.
    *   Navigate to the `backend` folder.
    *   Create a file named `.env` (or edit the existing one).
    *   Ensure it contains the following configuration (replace password if needed):

    ```env
    PORT=5000
    # Update 'password' with your PostgreSQL password
    DATABASE_URL="postgresql://postgres:password@localhost:5432/police_db?schema=public"
    # Update if your MongoDB runs on a different port
    MONGO_URI="mongodb://localhost:27017/police_complaints"
    # Random secret key for security
    JWT_SECRET="your_super_secret_key_123"
    ```

3.  **Run the Setup Script**:
    *   Go back to the root folder (`Police_complaint_management`).
    *   Double-click on **`setup_and_run.bat`**.

    **What this script does:**
    *   ✅ Installs all backend libraries.
    *   ✅ Sets up the database tables (PostgreSQL) and collections (MongoDB).
    *   ✅ **Seeds the database** with sample Police Officers and Stations.
    *   ✅ Installs all frontend libraries.
    *   ✅ Starts both the Backend API and the Frontend Website.

    *If the windows close immediately or you see errors, ensure your PostgreSQL and MongoDB services are running.*

---

## 💻 Manual Setup (Mac/Linux or Advanced Users)

If you cannot use the batch file, follow these manual steps:

### 1. Backend Setup
```bash
cd backend
npm install                     # Install dependencies
npx prisma generate            # Generate database client
npx prisma db push             # Create database tables
node src/index.js              # Start the server (runs on port 5000)
# (Ideally run 'node prisma/seed.js' once before starting to get test accounts)
```

### 2. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install --legacy-peer-deps # Install dependencies
npm run dev                    # Start the React app (runs on port 5173)
```

---

## 🔑 Demo Credentials

Use these accounts to test the system features:

### **1. Citizen (Victim)**
*   **Email**: `rahul@example.com`
*   **Password**: `password123`
*   *(Or register a new account specifically as a "Citizen")*

### **2. Police Inspector (Officer)**
> **Note**: Police accounts are pre-created by the system (seeded). You cannot register as a policeman manually.

*   **Inspector Ramesh** (Kengeri Station)
    *   Email: `ramesh@kengeri.com`
    *   Password: `password123`
*   **Inspector Anita** (Indiranagar Station)
    *   Email: `anita@indiranagar.com`
    *   Password: `password123`

---

## 🧪 How to Use

1.  **Open the App**: Go to `http://localhost:5174` (or 5173, check terminal output).
2.  **Login**: Choose "Citizen" or "Police" and sign in.
3.  **Lodge Complaint**: As a citizen, file a new complaint.
4.  **Manage**: Log out and log in as a Police Officer (e.g., Ramesh). You will see the complaint if it matches your station jurisdiction (note: the seed data assigns specific stations, so ensure you check the right dashboard).
