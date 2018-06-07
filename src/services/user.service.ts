import { Component } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/CreateUserCommand';

@Component()
export class UserService {

    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    async create(user: any): Promise<any> {
        return await this.commandBus.execute(
            new CreateUserCommand('12345', 'Sebastian'),
        );
    }

    findAll(): any[] {
        return [];
    }
}