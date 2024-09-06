import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh_token_repository.service';
import { UserRepository } from '../../repository/services/user_repository.service';
import { UsersService } from '../../users/services/users.service';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import { SingInAuthResDto } from '../dto/req/singInAuth.req.dto';
import { SingUpAuthReqDto } from '../dto/req/singUpAuth.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/userTokenPair.res.dto';
import { IUserData } from '../interfaces/IUserData';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly refreshRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  private async generateSaveTokens(
    userId: string,
    deviceId: string,
  ): Promise<TokenPairResDto> {
    const tokens = await this.tokenService.generateAuthTokens({
      userId,
      deviceId,
    });
    await Promise.all([
      this.refreshRepository.save({
        deviceId,
        refresh: tokens.refresh,
        userId,
      }),
      this.authCacheService.saveToken(tokens.access, userId, deviceId),
    ]);
    return tokens;
  }

  private async deleteTokens(userId: string, deviceId: string) {
    // delete previously issued refresh and access Tokens
    await Promise.all([
      this.refreshRepository.delete({
        deviceId,
        userId,
      }),
      this.authCacheService.deleteToken(userId, deviceId),
    ]);
  }

  @SkipAuth()
  public async singUp(dto: SingUpAuthReqDto): Promise<AuthResDto> {
    // Check if user exist
    await this.userService.isEmailExistOrThrow(dto.email);

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const tokens = await this.generateSaveTokens(user.id, dto.deviceId);
    return { user, tokens };
  }

  @SkipAuth()
  public async singIn(dto: SingInAuthResDto): Promise<AuthResDto> {
    // Is user exist?
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: {
        id: true,
        password: true,
        bio: true,
        image: true,
        name: true,
        created: true,
        updated: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    // Is password valid?
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    // delete previously issued refresh and access Tokens
    await this.deleteTokens(user.id, dto.deviceId);

    const tokens = await this.generateSaveTokens(user.id, dto.deviceId);

    return { user, tokens };
  }

  public async refresh({
    userId,
    deviceId,
  }: IUserData): Promise<TokenPairResDto> {
    await this.deleteTokens(userId, deviceId);
    return await this.generateSaveTokens(userId, deviceId);
  }

  public async signOut({ userId, deviceId }: IUserData) {
    await this.deleteTokens(userId, deviceId);
  }
}
