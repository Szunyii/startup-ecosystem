-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "taxNumber" TEXT NOT NULL,
    "profileUrl" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "hqRegion" TEXT NOT NULL,
    "hqCountry" TEXT NOT NULL,
    "growthStage" TEXT NOT NULL,
    "employees" TEXT NOT NULL,
    "valuation" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Industries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "industrie" TEXT NOT NULL,
    CONSTRAINT "Industries_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
