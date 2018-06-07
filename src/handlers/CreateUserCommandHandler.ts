import * as clc from 'cli-color';
import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/CreateUserCommand';
import { UserRepository } from '../repository/UserRepository';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {

    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: CreateUserCommand, resolve: (value?) => void) {
        const user = await this.publisher.mergeObjectContext(
            await this.repository.findOneById(command.userId),
        );
        user.create(command.name);
        user.commit();
        resolve();
    }
}