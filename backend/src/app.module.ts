import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import {RestaurantController} from "./controllers/RestaurantController";
import {RestaurantService} from "./services/RestaurantService";
import {PrismaService} from "./prisma.service";
import {MenuCategoryController} from "./controllers/MenuCategoryController";
import {ProductItemService} from "./services/ProductItemService";
import {MenuCategoryService} from "./services/MenuCategoryService";
import {ProductItemController} from "./controllers/ProductItemController";
import {OrderController} from "./controllers/OrderController";
import {OrderService} from "./services/OrderService";

@Module({
  imports: [],
  controllers: [AppController, RestaurantController, MenuCategoryController, RestaurantController, ProductItemController, OrderController],
  providers: [AppService, RestaurantService, PrismaService, MenuCategoryController, ProductItemService, MenuCategoryService, OrderService],
})
export class AppModule {}
