-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_authorId_fkey`;

-- DropIndex
DROP INDEX `Announcement_authorId_fkey` ON `Announcement`;

-- AlterTable
ALTER TABLE `Announcement` MODIFY `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Admin`(`memberId`) ON DELETE SET NULL ON UPDATE CASCADE;
