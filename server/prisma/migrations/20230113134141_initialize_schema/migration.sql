-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `displayname` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userType` ENUM('SUPERADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `avatarURL` VARCHAR(191) NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_username_email_idx`(`username`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(191) NOT NULL,
    `displayname` VARCHAR(191) NULL,
    `userID` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `avatarURL` VARCHAR(191) NULL,

    UNIQUE INDEX `groups_id_key`(`id`),
    UNIQUE INDEX `groups_groupname_key`(`groupname`),
    INDEX `groups_groupname_displayname_idx`(`groupname`, `displayname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `groupID` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `posts_id_key`(`id`),
    INDEX `posts_title_groupID_userID_idx`(`title`, `groupID`, `userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `parentPostID` INTEGER NOT NULL,
    `ownerID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `comments_id_key`(`id`),
    INDEX `comments_parentPostID_ownerID_idx`(`parentPostID`, `ownerID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
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
    `userID` INTEGER NOT NULL,
    `groupID` INTEGER NOT NULL,
    `role` ENUM('SUPERADMIN', 'MODERATOR', 'USER', 'SOFTBANNED', 'BANNED') NOT NULL DEFAULT 'USER',
    `timeUnbanned` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_follow_groups_userID_groupID_role_idx`(`userID`, `groupID`, `role`),
    UNIQUE INDEX `user_follow_groups_userID_groupID_key`(`userID`, `groupID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `postID` INTEGER NOT NULL,
    `reaction` ENUM('DOWNVOTE', 'NONE', 'UPVOTE') NOT NULL DEFAULT 'NONE',

    UNIQUE INDEX `post_reactions_id_key`(`id`),
    INDEX `post_reactions_userID_postID_idx`(`userID`, `postID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `commentID` INTEGER NOT NULL,
    `reaction` ENUM('DOWNVOTE', 'NONE', 'UPVOTE') NOT NULL DEFAULT 'NONE',

    UNIQUE INDEX `comment_reactions_id_key`(`id`),
    INDEX `comment_reactions_userID_commentID_idx`(`userID`, `commentID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `postID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('APPROVE', 'UNHANDLED', 'BAN') NOT NULL DEFAULT 'UNHANDLED',
    `bannedReason` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `post_reports_id_key`(`id`),
    INDEX `post_reports_status_postID_bannedReason_idx`(`status`, `postID`, `bannedReason`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `commentID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('APPROVE', 'UNHANDLED', 'BAN') NOT NULL DEFAULT 'UNHANDLED',
    `bannedReason` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `comment_reports_id_key`(`id`),
    INDEX `comment_reports_status_commentID_bannedReason_idx`(`status`, `commentID`, `bannedReason`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_parentPostID_fkey` FOREIGN KEY (`parentPostID`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `attachments_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_follow_groups` ADD CONSTRAINT `user_follow_groups_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_follow_groups` ADD CONSTRAINT `user_follow_groups_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reactions` ADD CONSTRAINT `post_reactions_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reactions` ADD CONSTRAINT `post_reactions_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_reactions` ADD CONSTRAINT `comment_reactions_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_reactions` ADD CONSTRAINT `comment_reactions_commentID_fkey` FOREIGN KEY (`commentID`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reports` ADD CONSTRAINT `post_reports_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reports` ADD CONSTRAINT `post_reports_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_reports` ADD CONSTRAINT `comment_reports_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_reports` ADD CONSTRAINT `comment_reports_commentID_fkey` FOREIGN KEY (`commentID`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
