-- CreateTable
CREATE TABLE `AnnouncementFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `announcementId` INTEGER NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnnouncementFile` ADD CONSTRAINT `AnnouncementFile_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcement`(`announcementId`) ON DELETE CASCADE ON UPDATE CASCADE;
