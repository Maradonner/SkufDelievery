import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import {AuthService} from "../auth/AuthService";
import {GoogleAuthGuard} from "../auth/GoogleAuthGuard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) {
        // No content needed here, NestJS will handle the redirect
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req, @Res() res: Response) {
        const user = await this.authService.validateUser(
            req.user.email,
            req.user.firstName,
            req.user.lastName,
            req.user.picture
        );
        // Redirect to some page or return user info
        res.redirect('/some-page');  // Ensure correct type is used
    }
}
