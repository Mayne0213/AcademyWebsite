/*
  Warnings:

  - You are about to drop the column `academyId` on the `Announcement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_academyId_fkey`;

-- DropIndex
DROP INDEX `Announcement_academyId_fkey` ON `Announcement`;

-- AlterTable
ALTER TABLE `Announcement` DROP COLUMN `academyId`;

-- CreateTable
CREATE TABLE `FileUpload` (
    `announcementId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`announcementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FileUpload` ADD CONSTRAINT `FileUpload_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Admin`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
