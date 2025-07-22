-- CreateTable
CREATE TABLE `_AnnouncementToAcademy` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AnnouncementToAcademy_AB_unique`(`A`, `B`),
    INDEX `_AnnouncementToAcademy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AnnouncementToAcademy` ADD CONSTRAINT `_AnnouncementToAcademy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Academy`(`academyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnnouncementToAcademy` ADD CONSTRAINT `_AnnouncementToAcademy_B_fkey` FOREIGN KEY (`B`) REFERENCES `Announcement`(`announcementId`) ON DELETE CASCADE ON UPDATE CASCADE;
