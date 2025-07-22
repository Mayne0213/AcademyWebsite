/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `academyId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `Announcement` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studentId` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[adminPhone]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_academyId_fkey`;

-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_studentId_fkey`;

-- DropIndex
DROP INDEX `Admin_academyId_fkey` ON `Admin`;

-- DropIndex
DROP INDEX `Announcement_adminId_fkey` ON `Announcement`;

-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    DROP COLUMN `academyId`,
    DROP COLUMN `adminId`,
    ADD COLUMN `memberId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`memberId`);

-- AlterTable
ALTER TABLE `Announcement` DROP COLUMN `adminId`,
    ADD COLUMN `authorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    DROP COLUMN `studentId`,
    ADD COLUMN `memberId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`memberId`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `memberId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`memberId`);

-- CreateTable
CREATE TABLE `_AdminToAcademy` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AdminToAcademy_AB_unique`(`A`, `B`),
    INDEX `_AdminToAcademy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_adminPhone_key` ON `Admin`(`adminPhone`);

-- CreateIndex
CREATE UNIQUE INDEX `User_userId_key` ON `User`(`userId`);

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Admin`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToAcademy` ADD CONSTRAINT `_AdminToAcademy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Academy`(`academyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToAcademy` ADD CONSTRAINT `_AdminToAcademy_B_fkey` FOREIGN KEY (`B`) REFERENCES `Admin`(`memberId`) ON DELETE CASCADE ON UPDATE CASCADE;
