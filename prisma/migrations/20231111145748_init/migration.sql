-- CreateTable
CREATE TABLE "Call" (
    "id" SERIAL NOT NULL,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "sid" TEXT,
    "stauts" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "recordingUrl" TEXT NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);
