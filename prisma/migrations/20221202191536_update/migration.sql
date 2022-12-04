/*
  Warnings:

  - You are about to drop the column `createdAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Made the column `content` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `age` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `createdAt`,
    DROP COLUMN `published`,
    DROP COLUMN `title`,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `profile` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` TEXT NOT NULL,
    `authorId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authorId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_friends` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_friends_AB_unique`(`A`, `B`),
    INDEX `_friends_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_friends` ADD CONSTRAINT `_friends_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_friends` ADD CONSTRAINT `_friends_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
