/*
  Warnings:

  - You are about to drop the `FileUpload` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[academyPhone]` on the table `Academy` will be added. If there are existing duplicate values, this will fail.
  - Made the column `academyAddress` on table `Academy` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `FileUpload` DROP FOREIGN KEY `FileUpload_authorId_fkey`;

-- AlterTable
ALTER TABLE `Academy` MODIFY `academyAddress` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `FileUpload`;

-- CreateTable
CREATE TABLE `QnABoard` (
    `qnaId` INTEGER NOT NULL AUTO_INCREMENT,
    `qnaTitle` VARCHAR(191) NOT NULL,
    `qnaContent` VARCHAR(191) NOT NULL,
    `qnaUserId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`qnaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QnABoardComment` (
    `commentId` INTEGER NOT NULL AUTO_INCREMENT,
    `commentContent` VARCHAR(191) NOT NULL,
    `commentUserId` INTEGER NOT NULL,
    `qnaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Academy_academyPhone_key` ON `Academy`(`academyPhone`);

-- AddForeignKey
ALTER TABLE `QnABoard` ADD CONSTRAINT `QnABoard_qnaUserId_fkey` FOREIGN KEY (`qnaUserId`) REFERENCES `User`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QnABoardComment` ADD CONSTRAINT `QnABoardComment_commentUserId_fkey` FOREIGN KEY (`commentUserId`) REFERENCES `User`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QnABoardComment` ADD CONSTRAINT `QnABoardComment_qnaId_fkey` FOREIGN KEY (`qnaId`) REFERENCES `QnABoard`(`qnaId`) ON DELETE RESTRICT ON UPDATE CASCADE;
