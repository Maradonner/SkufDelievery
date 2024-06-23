import {Controller, Request, Post, UseGuards, Get, NotFoundException} from '@nestjs/common';
import {UserService} from "../auth/UserService";

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Get('profile')
    async getProfile(@Request() req) {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.userService.findOneById(userId);
    }
}
