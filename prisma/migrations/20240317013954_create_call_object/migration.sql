-- CreateTable
CREATE TABLE "Call" (
    "id" SERIAL NOT NULL,
    "call_sid" TEXT NOT NULL,
    "caller" TEXT NOT NULL,
    "reciever" TEXT NOT NULL,
    "call_status" TEXT NOT NULL,
    "voicemail_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Call_call_sid_key" ON "Call"("call_sid");
