import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../eventss/UserCreatedEvent';

export class User extends AggregateRoot {

    constructor(private readonly userId: string) {
        super();
    }

    create(name: string) {
        this.apply(new UserCreatedEvent(this.userId, name));
    }

}