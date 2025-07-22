-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userPassword` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('STUDENT', 'ADMIN') NOT NULL DEFAULT 'STUDENT',

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `adminId` INTEGER NOT NULL,
    `academyId` INTEGER NULL,
    `adminName` VARCHAR(191) NOT NULL,
    `adminPhone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `studentId` INTEGER NOT NULL,
    `academyId` INTEGER NOT NULL,
    `studentName` VARCHAR(191) NOT NULL,
    `studentPhone` VARCHAR(191) NOT NULL,
    `studentHighschool` VARCHAR(191) NULL,
    `studentBirthYear` INTEGER NOT NULL,
    `studentMemo` VARCHAR(191) NULL,

    UNIQUE INDEX `Student_studentPhone_key`(`studentPhone`),
    PRIMARY KEY (`studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Academy` (
    `academyId` INTEGER NOT NULL AUTO_INCREMENT,
    `academyName` VARCHAR(191) NOT NULL,
    `academyPhone` VARCHAR(191) NULL,
    `academyAddress` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Academy_academyName_key`(`academyName`),
    PRIMARY KEY (`academyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `announcementId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `adminId` INTEGER NOT NULL,
    `academyId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`announcementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_academyId_fkey` FOREIGN KEY (`academyId`) REFERENCES `Academy`(`academyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_academyId_fkey` FOREIGN KEY (`academyId`) REFERENCES `Academy`(`academyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_academyId_fkey` FOREIGN KEY (`academyId`) REFERENCES `Academy`(`academyId`) ON DELETE CASCADE ON UPDATE CASCADE;
