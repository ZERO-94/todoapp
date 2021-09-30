import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, user_name, ...userInformation } = user;
      return userInformation;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.user_name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
