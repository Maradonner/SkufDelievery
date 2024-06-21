/*
  Warnings:

  - You are about to drop the column `orderId` on the `ProductItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_orderId_fkey";

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "ProductItemsOnOrders" (
    "productId" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "ProductItemsOnOrders_pkey" PRIMARY KEY ("productId","orderId")
);

-- AddForeignKey
ALTER TABLE "ProductItemsOnOrders" ADD CONSTRAINT "ProductItemsOnOrders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItemsOnOrders" ADD CONSTRAINT "ProductItemsOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrderDetails"("orderNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
