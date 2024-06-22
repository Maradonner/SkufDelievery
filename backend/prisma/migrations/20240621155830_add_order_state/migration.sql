-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELED');

-- AlterTable
ALTER TABLE "OrderDetails" ADD COLUMN     "state" "OrderState" NOT NULL DEFAULT 'PENDING';
