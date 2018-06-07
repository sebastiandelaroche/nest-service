import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,

    ) { }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    async create(): Promise<any> {
        return await this.userService.create({});
    }

}