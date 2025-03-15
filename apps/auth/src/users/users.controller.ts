import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../current-user-decorator';
import { UserDocument } from './models/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Request() req, @Body() inputs: CreateUserDto): Promise<object> {
    // restrict creating duplicate users
    const user = await this.usersService.create(inputs);
    delete user['password'];
    return user;
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    delete user['password'];
    return user;
  }
}
