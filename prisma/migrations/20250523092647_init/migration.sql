-- CreateTable
CREATE TABLE "Startup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "taxNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OperatingResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "balanceSheet" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "startupId" INTEGER NOT NULL,
    CONSTRAINT "OperatingResult_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Startup_companyName_taxNumber_key" ON "Startup"("companyName", "taxNumber");
