import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GetStoredDataFromResponse } from './decorators/get-stored-data-from-response.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { SingInAuthResDto } from './dto/req/singInAuth.req.dto';
import { SingUpAuthReqDto } from './dto/req/singUpAuth.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { TokenPairResDto } from './dto/res/userTokenPair.res.dto';
import { JwtRefreshGuard } from './guard/jwt_refresh.guard';
import { IUserData } from './interfaces/IUserData';
import { AuthService } from './services/auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sing-up')
  public async singUp(@Body() dto: SingUpAuthReqDto): Promise<AuthResDto> {
    return await this.authService.singUp(dto);
  }

  @SkipAuth()
  @Post('sing-in')
  public async singIn(@Body() dto: SingInAuthResDto): Promise<AuthResDto> {
    return await this.authService.singIn(dto);
  }

  // Skip access token check
  @SkipAuth()
  // add refresh token check
  @UseGuards(JwtRefreshGuard)
  // Add authorization marker to endpoint in Swagger
  @ApiBearerAuth()
  @Post('refresh')
  public async refresh(
    @GetStoredDataFromResponse() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @ApiBearerAuth()
  @Post('sign-out')
  async signOut(
    @GetStoredDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.authService.signOut(userData);
  }
}
