import { Component } from '@nestjs/common';
import { User } from '../models/User';

@Component()
export class UserRepository {

    async findOneById(id: string): Promise<User> {
        return new User('1');
    }

}