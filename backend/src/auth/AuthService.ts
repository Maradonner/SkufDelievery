import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {UserService} from "../services/UserService";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, firstName: string, lastName: string, picture: string): Promise<User> {
        let user = await this.userService.findByEmail(email);
        if (!user) {
            user = await this.userService.createWithGoogle(email, firstName, lastName, picture);
        }
        return user;
    }
}
