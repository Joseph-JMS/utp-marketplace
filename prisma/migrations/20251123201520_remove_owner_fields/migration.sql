/*
  Warnings:

  - You are about to drop the column `ownerId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_ownerId_fkey`;

-- DropIndex
DROP INDEX `Product_ownerId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `ownerId`;

-- AlterTable
ALTER TABLE `user` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'USER';
