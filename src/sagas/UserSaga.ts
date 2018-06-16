import { Observable } from 'rxjs';
import { ICommand, EventObservable } from '@nestjs/cqrs';
import { Component } from '@nestjs/common';
import { UserCreatedEvent } from '../eventss/UserCreatedEvent';
import { CreateUserCommand } from '../commands/CreateUserCommand';

@Component()
export class UserSaga {

    created = (events$: EventObservable<any>): any => {
        events$.ofType()
    }
}