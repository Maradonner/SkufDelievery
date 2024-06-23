import {PassportSerializer} from "@nestjs/passport";
import {UserService} from "./UserService";
import {Injectable} from "@nestjs/common";
import { User } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super();
    }

    serializeUser(user: User, done: Function) {
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: Function) {
        const user = await this.userService.findOneById(userId);
        done(null, user);
    }
}