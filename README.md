# 🚓 Advanced Police Complaint Management System (PCMS)

A modern, full-stack application for managing police complaints, designed for transparency, efficiency, and collaboration. Features include specific roles (Admin/Commissioner, Officers, Citizens), real-time updates, AI-powered analysis, voice complaints, and secure case management.

---

## 🚀 Features
- **Role-Based Access Control**:
  - **Citizens**: Lodge complaints (Text/Voice), track status, view timeline.
  - **Officers**: Manage assigned cases, update status, issue digital summons, add internal notes.
  - **Commissioner (Admin)**: Strategic dashboard, station management, analytics, unverified intelligence (anonymous tips).
- **AI Integration (Google Gemini)**:
  - Auto-analyzes complaint severity and category.
  - Generates summaries from voice transcripts.
- **Voice Complaint System**: Record complaints via microphone; auto-transcribed and filed.
- **Anonymous Tips**: Public submission of intelligence; routed directly to the Commissioner.
- **Digital Summons**: Issue and track summons digitally.
- **Case Collaboration**: Share cases between officers; private internal notes.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Node.js, Express.js
- **Database**:
  - **PostgreSQL** (Relational Data: Users, Complaints, Stations) - managed via Prisma ORM.
  - **MongoDB** (Unstructured Data: Logs, Notes, Evidence Metadata).
- **AI**: Google Gemini 1.5 Flash API.

---

## 📦 Prerequisites & Installation

### 1. Install Node.js (Runtime)
- **Windows/Ubuntu**: Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
- Verify: `node -v` and `npm -v`.

### 2. Install Databases

#### A. PostgreSQL (The SQL Database)
- **Windows**:
  1. Download the installer from [postgresql.org](https://www.postgresql.org/download/windows/).
  2. Run the installer. **IMPORTANT**: Remember the password you set for the `postgres` user (Default used here: `helloPeter@2005`).
  3. Additional: Install **pgAdmin 4** (usually included) to manage the DB visually.
- **Ubuntu**:
  ```bash
  sudo apt update
  sudo apt install postgresql postgresql-contrib
  sudo systemctl start postgresql.service
  # Set password for 'postgres' user
  sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'your_password';"
  ```

#### B. MongoDB (The NoSQL Database)
- **Windows**:
  1. Download **MongoDB Community Server** from [mongodb.com](https://www.mongodb.com/try/download/community).
  2. Run the installer. Select "Install MongoDB as a Service".
  3. Recommended: Install **MongoDB Compass** (GUI) to view data.
- **Ubuntu**:
  Follow the official guide: [Install MongoDB on Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/).

### 3. Get Google Gemini API Key (AI Features)
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click **"Get API key"**.
3. Create a project and clicking **"Create API key in class project"**.
4. Copy the key string (starts with `AIza...`).

---

## ⚙️ Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/TARUN-2305/Advance-Police-Complaint-Management-System.git
cd Advance-Police-Complaint-Management-System
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Environment Variables (`.env`)
Create a file named `.env` in the `backend` folder and add:

```env
PORT=5001
# PostgreSQL Connection (Change password if different)
DATABASE_URL="postgresql://postgres:helloPeter%402005@localhost:5432/police_db_advance_new?schema=public"

# MongoDB Connection
MONGO_URI="mongodb://127.0.0.1:27017/police_db_advance_new"

# JWT Secret for Auth
JWT_SECRET="supersecretkey123"

# Google Gemini API Key
GEMINI_API_KEY="YOUR_COPIED_API_KEY_HERE"
```

#### Database Initialization
1.  **Migrate PostgreSQL Schema**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```
2.  **Seed Default Data (Admin & Stations)**:
    ```bash
    node reset_and_seed.js
    ```
    *This script resets the DB and creates default Admin/Officer accounts.*

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```

---

## 🏃‍♂️ Running the Application

### 1. Start Backend Server
In the `backend` terminal:
```bash
npm start
```
*Output should say: `Server running on port 5001` & `Connected to MongoDB`.*

### 2. Start Frontend Application
In the `frontend` terminal:
```bash
npm run dev
```
*Click the Local URL (e.g., `http://localhost:5173`) to open the app.*

---

## 🔑 Default Credentials (Created by Seed Script)

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | Commissioner Vikram | `admin@police.gov.in` | `password123` |
| **Officer** | Inspector Ramesh | `ramesh@kengeri.com` | `password123` |
| **Officer** | Inspector Suresh | `suresh@jayanagar.com` | `password123` |
| **Officer** | Inspector Anita | `anita@indiranagar.com` | `password123` |
| **Officer** | Inspector Deepa | `deepa@koramangala.com` | `password123` |

*Note: Citizen accounts must be registered manually.*

---

## 🧪 Testing Features
1.  **Lodge Complaint (Voice/Text)**: Login as Citizen (register first). Use the "Voice" button to narrate an incident.
2.  **AI Analysis**: See the severity score and category auto-assigned.
3.  **Manage Case**: Login as Officer. Accept the case. Add Internal Notes (Private). Issue Summons.
4.  **Anonymous Tip**: Go to Home Page -> "Submit Anonymous Intelligence". Then login as Admin -> Analytics Dashboard to view it.
