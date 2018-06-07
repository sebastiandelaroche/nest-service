import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../eventss/UserCreatedEvent';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {

    handle(event: UserCreatedEvent) {
        console.log(event);
    }

}