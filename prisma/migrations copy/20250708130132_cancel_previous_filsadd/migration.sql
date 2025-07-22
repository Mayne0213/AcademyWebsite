/*
  Warnings:

  - You are about to drop the `AnnouncementFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AnnouncementFile` DROP FOREIGN KEY `AnnouncementFile_announcementId_fkey`;

-- DropTable
DROP TABLE `AnnouncementFile`;
