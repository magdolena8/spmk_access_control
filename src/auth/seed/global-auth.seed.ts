import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthSeed {
  constructor(private readonly authService: AuthService) {}

  @Command({
    command: 'create:authconfig',
    describe: 'create a global auth config document in mongodb',
  })
  async create() {
    const authConfig = await this.authService.createAuthConfig(
      process.env.CLOUD_LOGIN,
      process.env.CLOUD_PASSWORD,
    );
    console.log(authConfig);
    process.exit(1);
  }
}
