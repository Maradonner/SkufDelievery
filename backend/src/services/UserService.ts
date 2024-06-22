import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import {CreateUserDto} from "../dto/User/CreateUserDto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password, // Consider hashing the password before storing it
            },
        });
        return user;
    }

    async createWithGoogle(email: string, firstName: string, lastName: string, picture: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                email: email,
                name: firstName,
                password: lastName,
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
