# 🛡️ Advance Police Complaint Management System (PIS)

> **A Next-Generation, Zero-Trust, National-Scale Digital Policing Platform.**

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Security](https://img.shields.io/badge/Security-Zero%20Trust-blue)
![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Postgres-orange)

## 📖 Executive Summary
The **Police Information System (PIS)** is an enterprise-grade web application designed to digitize the entire lifecycle of police casework. From citizen complaint registration to investigation, evidence management, and final case closure, PIS ensures transparency, accountability, and speed.

Built with a **Zero-Trust Security Model**, it features mandatory **Two-Factor Authentication (2FA)** for officers, **Immutable Audit Logs** for compliance, and **Role-Based Access Control (RBAC)** to prevent unauthorized access.

---

## 🏗️ System Architecture

The system uses a **Hybrid Database Architecture** to balance structured relational data (Cases, Officers) with high-volume unstructured data (Audit Logs, Evidence).

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React + Vite + Tailwind CSS | Responsive, dynamic user interface for Citizens & Police. |
| **Backend** | Node.js + Express | REST API, Business Logic, and Real-time Socket.io server. |
| **Primary DB** | PostgreSQL + Prisma ORM | ACID-compliant storage for Users, Complaints, Stations. |
| **Audit DB** | MongoDB | Append-only storage for Immutable Access Logs. |
| **Security** | Helmet, Rate-Limit, TOTP | Hardening, DDoS protection, and 2FA. |
| **DevOps** | Docker + Docker Compose | Containerized deployment for consistency. |

---

## 🔐 Key Features

### 1. Zero-Trust Security 🛡️
*   **2FA Enforcement**: Officers generally must authenticate using TOTP (Google Authenticator) for login.
*   **Immutable Audit Trails**: Every sensitive action (viewing a case, downloading an FIR) is cryptographically logged in MongoDB.
*   **Rate Limiting**: Protects against Brute-Force and DDoS attacks on auth/public endpoints.

### 2. Digital Case Management 📂
*   **Auto-Assignment**: Complaints are automatically routed to the correct Police Station based on jurisdiction logic.
*   **Evidence Vault**: Secure upload for images/docs by Officers (and Citizens via Timeline).
*   **Real-time Timeline**: Citizens track case progress (Approved → Investigation → Closed) in real-time.

### 3. Citizen Services 🤝
*   **Anonymous Tips**: Whistleblower-friendly module to submit Intel without login.
*   **Instant FIR**: Generate official, digitally signed PDF FIRs instantly.
*   **Feedback Loop**: Mandatory satisfaction survey upon case closure to rate police performance.

---

## 🚀 Service Flows

### 👮‍♂️ Officer Flow (Investigation)
1.  **Login**: Authenticate with Credentials + 2FA Code.
2.  **Dashboard**: View "Active Roster", "Pending Cases", and "Analytics".
3.  **Triage**: Accept a `PENDING` case -> Status becomes `INVESTIGATION`.
4.  **Action**: Add Updates, Upload Evidence, Summon Witnesses.
5.  **Close**: Resolve case -> Status `CLOSED` -> Trigger Feedback Email to Victim.

### 👨‍👩‍👧‍👦 Citizen Flow (Complaint)
1.  **Register/Login**: Create secure account.
2.  **Lodge Complaint**: Fill Incident Report (Location, Category, Description).
3.  **Track**: View Timeline for updates. Receive Email/SMS alerts.
4.  **Evidence**: Upload additional photos/videos if requested.
5.  **Download**: Get the official FIR PDF.

---

## 🛠️ Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   Docker & Docker Compose (Optional, for easy setup)
*   PostgreSQL & MongoDB (If running locally without Docker)

### Option A: 🐳 Run with Docker (Recommended)
This works instantly without setting up databases manually.
```bash
# 1. Clone the repository
git clone https://github.com/TARUN-2305/Advance-Police-Complaint-Management-System.git
cd police-complaint-system

# 2. Start the System
docker-compose up --build
```
*   **Frontend**: `http://localhost:3000`
*   **Backend**: `http://localhost:5001`

### Option B: Local Setup
```bash
# Backend
cd backend
npm install
# Create .env file (see .env.example)
npx prisma migrate dev
npm start

# Frontend
cd frontend
npm install
npm run dev
```

---

## 🧪 Default Credentials
Use these to explore the demo:

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@police.gov.in` | `password123` | Full System Control, Roster Management |
| **Inspector** | `inspector@police.gov.in`| `password123` | Case Investigation, Evidence Upload |
| **Citizen** | `citizen@example.com` | `password123` | Lodge Complaint, Track Status |

---

## 📸 Screenshots

*(Add screenshots of Dashboard, Timeline, and Analytics here)*

---
**Developed for Final Year Project Evaluation.**
*Secure. Scalable. Smart.*
