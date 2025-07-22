-- CreateTable
CREATE TABLE `Developer` (
    `memberId` INTEGER NOT NULL,

    PRIMARY KEY (`memberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Developer` ADD CONSTRAINT `Developer_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
