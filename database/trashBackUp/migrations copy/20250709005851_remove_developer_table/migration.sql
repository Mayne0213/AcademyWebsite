/*
  Warnings:

  - You are about to drop the `Developer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Developer` DROP FOREIGN KEY `Developer_memberId_fkey`;

-- DropTable
DROP TABLE `Developer`;
