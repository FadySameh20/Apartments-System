-- CreateTable
CREATE TABLE "apartments" (
    "id" SERIAL NOT NULL,
    "unitName" TEXT NOT NULL,
    "unitNumber" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "bedroomsCount" INTEGER NOT NULL,
    "bathroomsCount" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL,
    "images" TEXT[],
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apartments_unitNumber_key" ON "apartments"("unitNumber");

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
