/*
  Warnings:

  - Added the required column `username` to the `StandardUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StandardUser" ADD COLUMN     "username" VARCHAR(255) NOT NULL;
