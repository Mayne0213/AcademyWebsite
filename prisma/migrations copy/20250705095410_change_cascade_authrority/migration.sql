-- DropForeignKey
ALTER TABLE `QnABoardComment` DROP FOREIGN KEY `QnABoardComment_qnaId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_academyId_fkey`;

-- DropIndex
DROP INDEX `QnABoardComment_qnaId_fkey` ON `QnABoardComment`;

-- DropIndex
DROP INDEX `Student_academyId_fkey` ON `Student`;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_academyId_fkey` FOREIGN KEY (`academyId`) REFERENCES `Academy`(`academyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QnABoardComment` ADD CONSTRAINT `QnABoardComment_qnaId_fkey` FOREIGN KEY (`qnaId`) REFERENCES `QnABoard`(`qnaId`) ON DELETE CASCADE ON UPDATE CASCADE;
