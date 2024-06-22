import {Injectable, Logger} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import {AuthService} from "./AuthService";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    private readonly logger = new Logger(GoogleStrategy.name);

    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        this.logger.debug(`Profile: ${JSON.stringify(profile)}`);
        this.logger.debug(`Access Token: ${accessToken}`);
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }

    parseErrorResponse(body: any, status: number): Error {
        this.logger.error(`Error Response: ${JSON.stringify(body)}`);
        return super.parseErrorResponse(body, status);
    }
}