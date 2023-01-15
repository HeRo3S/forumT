-- AlterTable
ALTER TABLE `attachments` MODIFY `url` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `comment_reports` MODIFY `bannedReason` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `comments` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `groups` MODIFY `description` MEDIUMTEXT NULL,
    MODIFY `avatarURL` MEDIUMTEXT NULL;

-- AlterTable
ALTER TABLE `post_reports` MODIFY `bannedReason` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `posts` MODIFY `title` VARCHAR(200) NOT NULL,
    MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `password` MEDIUMTEXT NOT NULL,
    MODIFY `description` MEDIUMTEXT NULL,
    MODIFY `avatarURL` MEDIUMTEXT NULL;
