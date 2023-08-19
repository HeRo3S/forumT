/*
  Warnings:

  - Added the required column `parentGroupname` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN `parentGroupname` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `posts` MODIFY `type` ENUM('DEFAULT', 'MEDIA', 'ATTACHMENT', 'LINK', 'POLL') NOT NULL DEFAULT 'DEFAULT';

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_parentGroupname_fkey` FOREIGN KEY (`parentGroupname`) REFERENCES `groups`(`groupname`) ON DELETE RESTRICT ON UPDATE CASCADE;
