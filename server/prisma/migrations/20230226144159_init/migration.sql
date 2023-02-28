-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `displayname` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` MEDIUMTEXT NOT NULL,
    `userType` ENUM('SUPERADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `description` MEDIUMTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `avatarURL` MEDIUMTEXT NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_displayname_idx`(`displayname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(191) NOT NULL,
    `displayname` VARCHAR(191) NULL,
    `ownername` VARCHAR(191) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `avatarURL` MEDIUMTEXT NULL,

    UNIQUE INDEX `groups_id_key`(`id`),
    UNIQUE INDEX `groups_groupname_key`(`groupname`),
    INDEX `groups_groupname_displayname_idx`(`groupname`, `displayname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `groupname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `type` ENUM('DEFAULT', 'MEDIA', 'ATTACHMENT', 'POLL') NOT NULL DEFAULT 'DEFAULT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `posts_id_key`(`id`),
    INDEX `posts_title_groupname_username_idx`(`title`, `groupname`, `username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NOT NULL,
    `parentPostID` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `comments_id_key`(`id`),
    INDEX `comments_parentPostID_username_idx`(`parentPostID`, `username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` MEDIUMTEXT NOT NULL,
    `postID` INTEGER NOT NULL,
    `type` ENUM('PNG', 'JPEG', 'MP4', 'DOCX') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `attachments_id_key`(`id`),
    INDEX `attachments_postID_idx`(`postID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_follow_groups` (
    `username` VARCHAR(191) NOT NULL,
    `groupname` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPERADMIN', 'MODERATOR', 'USER', 'SOFTBANNED', 'BANNED') NOT NULL DEFAULT 'USER',
    `timeUnbanned` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_follow_groups_username_groupname_role_idx`(`username`, `groupname`, `role`),
    UNIQUE INDEX `user_follow_groups_username_groupname_key`(`username`, `groupname`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `postID` INTEGER NOT NULL,
    `reaction` ENUM('DOWNVOTE', 'NONE', 'UPVOTE') NOT NULL DEFAULT 'NONE',

    UNIQUE INDEX `post_reactions_id_key`(`id`),
    INDEX `post_reactions_username_postID_idx`(`username`, `postID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `commentID` INTEGER NOT NULL,
    `reaction` ENUM('DOWNVOTE', 'NONE', 'UPVOTE') NOT NULL DEFAULT 'NONE',

    UNIQUE INDEX `comment_reactions_id_key`(`id`),
    INDEX `comment_reactions_username_commentID_idx`(`username`, `commentID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `postID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('APPROVE', 'UNHANDLED', 'BAN') NOT NULL DEFAULT 'UNHANDLED',
    `bannedReason` VARCHAR(500) NOT NULL,

    UNIQUE INDEX `post_reports_id_key`(`id`),
    INDEX `post_reports_status_postID_bannedReason_idx`(`status`, `postID`, `bannedReason`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `commentID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('APPROVE', 'UNHANDLED', 'BAN') NOT NULL DEFAULT 'UNHANDLED',
    `bannedReason` VARCHAR(500) NOT NULL,

    UNIQUE INDEX `comment_reports_id_key`(`id`),
    INDEX `comment_reports_status_commentID_bannedReason_idx`(`status`, `commentID`, `bannedReason`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_ownername_fkey` FOREIGN KEY (`ownername`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_groupname_fkey` FOREIGN KEY (`groupname`) REFERENCES `groups`(`groupname`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_parentPostID_fkey` FOREIGN KEY (`parentPostID`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `attachments_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_follow_groups` ADD CONSTRAINT `user_follow_groups_groupname_fkey` FOREIGN KEY (`groupname`) REFERENCES `groups`(`groupname`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_follow_groups` ADD CONSTRAINT `user_follow_groups_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reactions` ADD CONSTRAINT `post_reactions_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reactions` ADD CONSTRAINT `post_reactions_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_reactions` ADD CONSTRAINT `comment_reactions_commentID_fkey` FOREIGN KEY (`commentID`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_reactions` ADD CONSTRAINT `comment_reactions_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reports` ADD CONSTRAINT `post_reports_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reports` ADD CONSTRAINT `post_reports_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_reports` ADD CONSTRAINT `comment_reports_commentID_fkey` FOREIGN KEY (`commentID`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_reports` ADD CONSTRAINT `comment_reports_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
