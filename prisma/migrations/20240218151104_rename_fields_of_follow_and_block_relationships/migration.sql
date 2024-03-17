/*
  Warnings:

  - You are about to drop the column `blockedId` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `blockerId` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `followedId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `Follow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blockedThisId,blockedById]` on the table `Block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followerToId,followedById]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blockedById` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockedThisId` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followedById` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerToId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blockedId_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blockerId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followedId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- DropIndex
DROP INDEX "Block_blockedId_idx";

-- DropIndex
DROP INDEX "Block_blockerId_blockedId_key";

-- DropIndex
DROP INDEX "Block_blockerId_idx";

-- DropIndex
DROP INDEX "Follow_followedId_idx";

-- DropIndex
DROP INDEX "Follow_followerId_followedId_key";

-- DropIndex
DROP INDEX "Follow_followerId_idx";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "blockedId",
DROP COLUMN "blockerId",
ADD COLUMN     "blockedById" TEXT NOT NULL,
ADD COLUMN     "blockedThisId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "followedId",
DROP COLUMN "followerId",
ADD COLUMN     "followedById" TEXT NOT NULL,
ADD COLUMN     "followerToId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Block_blockedThisId_idx" ON "Block"("blockedThisId");

-- CreateIndex
CREATE INDEX "Block_blockedById_idx" ON "Block"("blockedById");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockedThisId_blockedById_key" ON "Block"("blockedThisId", "blockedById");

-- CreateIndex
CREATE INDEX "Follow_followerToId_idx" ON "Follow"("followerToId");

-- CreateIndex
CREATE INDEX "Follow_followedById_idx" ON "Follow"("followedById");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerToId_followedById_key" ON "Follow"("followerToId", "followedById");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerToId_fkey" FOREIGN KEY ("followerToId") REFERENCES "StandardUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "StandardUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockedThisId_fkey" FOREIGN KEY ("blockedThisId") REFERENCES "StandardUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockedById_fkey" FOREIGN KEY ("blockedById") REFERENCES "StandardUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
