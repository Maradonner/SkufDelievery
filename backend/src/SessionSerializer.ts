import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import {UserService} from "./services/UserService";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super();
    }

    serializeUser(user: User, done: (err: Error, user: User) => void): any {
        done(null, user);
    }

    async deserializeUser(user: User, done: (err: Error, user: User) => void): Promise<any> {
        const userDb = await this.userService.findByEmail(user.email);
        return userDb ? done(null, userDb) : done(null, null);
    }
}
