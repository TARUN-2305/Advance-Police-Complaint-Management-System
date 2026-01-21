# 🇮🇳 Police Information System (PIS) - National Production Architecture
### *Secure. Scalable. Sovereign.*

---

## 🛡️ 1. Security Architecture (Zero-Trust)
We have upgraded the system from a prototype to a **Fortress**.
*   **Identity & Access Management (IAM)**:
    *   **2FA Enforcement**: Officers are *required* to verify identity via Time-Based One-Time Password (TOTP) using Google Authenticator.
    *   **Role-Based Access Control (RBAC)**: Strict separation between `CITIZEN`, `OFFICER`, and `ADMIN`.
*   **Audit & Compliance**:
    *   **Immutable Logs**: Every "View", "Login", and "Search" action is cryptographically logged in MongoDB.
    *   *Example Log*: `{"actor": "Inspector_X", "action": "VIEW_VICTIM_DATA", "resource": "Case_99", "ip": "10.0.0.1"}`.
*   **Perimeter Defense**:
    *   **Rate Limiting**: Public APIs (Tip-Offs, User Search) are protected against DDoS attacks (100 req/15min).
    *   **Helmet.js**: HTTP Header hardening against XSS and Clickjacking.

---

## 📡 2. Communication Grid
*   **Real-Time Command Center**:
    *   **Socket.io Infrastructure**: Replaced passive polling with active WebSockets. Officers receive "New Case" alerts instantly without refreshing.
*   **Citizen Notification System**:
    *   **Email Gateway**: Automated transactional emails (via SMTP) for:
        *   ✅ Complaint Lodged (FIR Acknowledgment)
        *   ⚖️ Case Status Updates (Investigation -> Closed)
        *   🔐 2FA/OTP Security Codes

---

## 🏗️ 3. DevOps & Infrastructure
*   **Containerization (Docker)**:
    *   Entire stack (Backend, Frontend, Postgres, Mongo) is containerized.
    *   **Deployment**: `docker-compose up --build` launches the full national node in seconds.
*   **Hybrid Database Cluster**:
    *   **PostgreSQL**: Relations, Users, Stations (ACID Compliance).
    *   **MongoDB**: Intelligence, Logs, Unstructured Evidence.

---

## 📊 4. Functional Module Status

| Module | Status | Production Grade? |
| :--- | :--- | :--- |
| **Authentication** | ✅ Live | **YES** (2FA + Rate Limited) |
| **Complaint Lifecycle** | ✅ Live | **YES** (Email + Sockets) |
| **Administration** | ✅ Live | **YES** (Audit Logs Enabled) |
| **Tip-Offs** | ✅ Live | **YES** (Anonymous + Secure) |
| **FIR Generation** | ✅ Live | **YES** (PDFKit Signed) |
| **Analytics** | ✅ Live | **YES** (Real-Time Data) |

---

## 🚀 Deployment Instructions

### Option A: Traditional (Local)
```bash
setup_and_run.bat
```

### Option B: Cloud Native (Docker) - **RECOMMENDED**
```bash
docker-compose up --build
```
*Access:*
*   **Frontend**: `http://localhost:3000` (Nginx Optimized)
*   **Backend API**: `http://localhost:5001`
*   **DBs**: Exposed on default ports `5432` & `27017`

---
*Verified by Security Architect - 2026*
