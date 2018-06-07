import { CommandBus, EventBus, CQRSModule } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { CreateUserCommandHandler } from './handlers/CreateUserCommandHandler';
import { UserCreatedEventHandler } from './handlers/UserCreatedEventHandler';

import { UserSaga } from './sagas/UserSaga';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repository/UserRepository';

@Module({
    imports: [CQRSModule],
    controllers: [UserController],
    components: [
        UserService,
        UserSaga,
        CreateUserCommandHandler,
        UserCreatedEventHandler,
        UserRepository,
    ],
})
export class AppModule implements OnModuleInit {

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly event$: EventBus,
        private readonly userSaga: UserSaga,
    ) { }

    onModuleInit() {
        this.command$.setModuleRef(this.moduleRef);

        this.event$.setModuleRef(this.moduleRef);

        this.event$.register([
            UserCreatedEventHandler,
        ]);

        this.command$.register([
            CreateUserCommandHandler,
        ]);

        // this.event$.combineSagas([
        //     this.userSaga.created,
        // ]);

    }

}