import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<object> {
    const userInfo = { ...createUserDto };

    const { email, provider, password } = userInfo;

    const found: User = await this.findOne({
      email,
      provider: provider || 'normal',
    });

    if (found) {
      throw new ConflictException('Existing email');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      userInfo.password = hashedPassword;
      const user = this.create(userInfo);
      await this.save(user);
      return { message: 'ok' };
    }
  }
}