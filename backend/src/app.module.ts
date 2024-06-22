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
import {CartService} from "./services/CartService";
import {CartController} from "./controllers/CartController";
import {AuthService} from "./auth/AuthService";
import {GoogleStrategy} from "./auth/GoogleStrategy";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "./controllers/AuthController";
import {UserService} from "./services/UserService";
import {SessionSerializer} from "./SessionSerializer";

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AppController, RestaurantController, MenuCategoryController, RestaurantController, ProductItemController, OrderController, CartController, AuthController],
  providers: [AppService, RestaurantService, PrismaService, MenuCategoryController, ProductItemService, MenuCategoryService, OrderService, CartService, UserService, AuthService, GoogleStrategy, SessionSerializer],
})
export class AppModule {}
