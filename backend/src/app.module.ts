import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RestaurantController} from "./RestaurantController";
import {RestaurantService} from "./RestaurantService";
import {PrismaService} from "./prisma.service";

@Module({
  imports: [],
  controllers: [AppController, RestaurantController],
  providers: [AppService, RestaurantService, PrismaService],
})
export class AppModule {}
