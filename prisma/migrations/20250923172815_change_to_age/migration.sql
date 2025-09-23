-- CreateTable
CREATE TABLE "public"."Investment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "authorPlz" TEXT NOT NULL,
    "authorAge" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InvestmentFinished" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "region" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "type" TEXT NOT NULL,
    "completedDate" TIMESTAMP(3),
    "contractor" TEXT,

    CONSTRAINT "InvestmentFinished_pkey" PRIMARY KEY ("id")
);
