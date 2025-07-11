-- AlterTable
ALTER TABLE `Academy` ADD COLUMN `academyMainImage` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `AcademyImage` (
    `academyImageId` INTEGER NOT NULL AUTO_INCREMENT,
    `academyImageUrl` VARCHAR(191) NOT NULL,
    `academyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`academyImageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AcademyImage` ADD CONSTRAINT `AcademyImage_academyId_fkey` FOREIGN KEY (`academyId`) REFERENCES `Academy`(`academyId`) ON DELETE CASCADE ON UPDATE CASCADE;
