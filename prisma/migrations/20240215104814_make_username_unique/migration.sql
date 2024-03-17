/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `StandardUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StandardUser_username_key" ON "StandardUser"("username");
