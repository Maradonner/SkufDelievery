import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findOneById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async createAnonymousUser(): Promise<User> {
        return this.prisma.user.create({
            data: {
                // No email or password, create an anonymous user
            },
        });
    }
}
