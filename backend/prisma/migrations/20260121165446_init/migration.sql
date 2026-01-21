-- CreateTable
CREATE TABLE "PoliceStation" (
    "station_id" SERIAL NOT NULL,
    "station_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact_number" TEXT,
    "in_charge_officer_id" INTEGER,

    CONSTRAINT "PoliceStation_pkey" PRIMARY KEY ("station_id")
);

-- CreateTable
CREATE TABLE "Victim" (
    "victim_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone_number" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Victim_pkey" PRIMARY KEY ("victim_id")
);

-- CreateTable
CREATE TABLE "PoliceOfficer" (
    "officer_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "badge_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rank" TEXT,
    "station_id" INTEGER NOT NULL,

    CONSTRAINT "PoliceOfficer_pkey" PRIMARY KEY ("officer_id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "complaint_id" SERIAL NOT NULL,
    "victim_id" INTEGER NOT NULL,
    "station_id" INTEGER,
    "assigned_officer_id" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "incident_location" TEXT,
    "incident_date" TIMESTAMP(3),
    "category" TEXT,
    "severity_level" TEXT,
    "current_status" TEXT NOT NULL DEFAULT 'PENDING',
    "visibility" TEXT NOT NULL DEFAULT 'PRIVATE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("complaint_id")
);

-- CreateTable
CREATE TABLE "ComplaintStatus" (
    "status_id" SERIAL NOT NULL,
    "complaint_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "updated_by_officer_id" INTEGER,
    "remarks" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComplaintStatus_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "Summon" (
    "summon_id" SERIAL NOT NULL,
    "complaint_id" INTEGER NOT NULL,
    "issued_by_officer_id" INTEGER NOT NULL,
    "recipient_name" TEXT NOT NULL,
    "recipient_address" TEXT,
    "appearance_date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Summon_pkey" PRIMARY KEY ("summon_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Victim_email_key" ON "Victim"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PoliceOfficer_badge_number_key" ON "PoliceOfficer"("badge_number");

-- CreateIndex
CREATE UNIQUE INDEX "PoliceOfficer_email_key" ON "PoliceOfficer"("email");

-- AddForeignKey
ALTER TABLE "PoliceOfficer" ADD CONSTRAINT "PoliceOfficer_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "PoliceStation"("station_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_victim_id_fkey" FOREIGN KEY ("victim_id") REFERENCES "Victim"("victim_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "PoliceStation"("station_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_assigned_officer_id_fkey" FOREIGN KEY ("assigned_officer_id") REFERENCES "PoliceOfficer"("officer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintStatus" ADD CONSTRAINT "ComplaintStatus_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("complaint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintStatus" ADD CONSTRAINT "ComplaintStatus_updated_by_officer_id_fkey" FOREIGN KEY ("updated_by_officer_id") REFERENCES "PoliceOfficer"("officer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summon" ADD CONSTRAINT "Summon_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("complaint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summon" ADD CONSTRAINT "Summon_issued_by_officer_id_fkey" FOREIGN KEY ("issued_by_officer_id") REFERENCES "PoliceOfficer"("officer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
