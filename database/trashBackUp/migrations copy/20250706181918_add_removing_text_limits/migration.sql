-- AlterTable
ALTER TABLE `Announcement` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `QnABoard` MODIFY `qnaContent` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `QnABoardComment` MODIFY `commentContent` TEXT NOT NULL;
