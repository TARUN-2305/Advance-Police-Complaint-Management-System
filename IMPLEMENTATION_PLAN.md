# Police Information System - Implementation Plan

## System Evolution Roadmap
This document outlines the architectural changes and development phases required to evolve the prototype into a production-grade system.

### Phase 1: Governance & Admin Core (Current Focus)
**Goal**: Establish the hierarchy and administrative control.
- [x] Basic "Add Officer" (Completed)
- [x] **Enhanced Officer Model** (Active/Inactive status, Last Login).
- [x] **Station Management**: Create Station, Define Jurisdiction (Keywords/Lat-Long).
- [x] **Duty Roster**: View officers per station + active case count.

### Phase 2: Collaboration & Workflow
**Goal**: Enable real-world policing workflows.
- [x] **Case Transfer**: Move cases between stations with "Transfer" audit log.
- [x] **Internal Notes**: Secure, police-only discussion threads (MongoDB).
- [x] **Summon System**: Digital summons issuing via Timeline.

- [x] **PDF Exports**: FIR Generation (using PDFKit).

### Phase 4: Analytics
**Goal**: Strategic oversight.
- [x] **Heatmap**: Visualization via Station Load and Intelligence.
- [x] **Commissioner Dashboard**: Aggregated stats (SQL Group By queries).

---

## Data Model Extensions (Schema Design)

### PostgreSQL (Prisma)
1.  **PoliceOfficer**:
    *   Add `is_active` (Boolean, default: true).
    *   Add `role_level` (Enum: CONSTABLE, INSPECTOR, ADMIN).
2.  **PoliceStation**:
    *   Add `jurisdiction` (String/JSON - keywords).
    *   Add `coordinates` (String - "lat,long").
3.  **Complaint**:
    *   Add `priority` (Enum: NORMAL, HIGH).
4.  **Feedback** (New Table):
    *   `id`
    *   `complaint_id` (FK)
    *   `rating` (Int)
    *   `comment` (Text)

### MongoDB (Mongoose)
1.  **InternalNote** (New Collection):
    *   `complaintId`
    *   `officerId`
    *   `content`
    *   `timestamp`
2.  **AnonymousTip** (New Collection):
    *   `caseId` (Optional - if linked to existing)
    *   `description`
    *   `location`
    *   `ipAddress` (Audit)

---

## Next Immediate Steps
1.  Optimize Mobile Responsiveness.
2.  Deploy to Production Env.
