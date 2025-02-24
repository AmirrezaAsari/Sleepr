import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Request() req, @Body() inputs: CreateUserDto): Promise<object> {
    return this.usersService.create(inputs);
  }
}
