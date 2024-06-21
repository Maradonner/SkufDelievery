/*
  Warnings:

  - Added the required column `restaurantId` to the `MenuCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuCategory" ADD COLUMN     "restaurantId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
