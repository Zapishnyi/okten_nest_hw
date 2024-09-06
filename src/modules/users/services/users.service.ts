import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/IUserData';
import { AuthService } from '../../auth/services/auth.service';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { FollowRepository } from '../../repository/services/follow_repository.service';
import { UserRepository } from '../../repository/services/user_repository.service';
import { UserUpdateDto } from '../dto/req/userUpdate.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserPresenter } from '../presenter/user-presenter';

@Injectable()
// @Injectable() you're declaring that this class can be managed by the NestJS IoC
// (Inversion of Control) container. This allows NestJS to handle the lifecycle of
// the class and inject it wherever it's needed.
export class UsersService {
  constructor(
    /*Integration of methods/services from sabling modules*/
    // public readonly postService: PostsService,
    public readonly userRepository: UserRepository,
    public readonly authCacheService: AuthCacheService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly followRepository: FollowRepository,
  ) {}

  public async findAll(): Promise<any> {
    return `This action returns all users`;
  }

  public async findMe(UserData: IUserData): Promise<UserResDto> {
    const userFound = await this.userRepository.findOneBy({
      id: UserData.userId,
    });
    return UserPresenter.toResponseDto(userFound);
  }

  public async updateMe(
    UserData: IUserData,
    updateUserDto: UserUpdateDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: UserData.userId });
    this.userRepository.merge(user, updateUserDto);
    return UserPresenter.toResponseDto(await this.userRepository.save(user));
  }

  public async removeMe(userData: IUserData): Promise<void> {
    await this.userRepository.delete({ id: userData.userId });
    // not needed because in entity onDelete:'CASCADE' option used
    // await this.authService.signOut(userData);
    await this.authCacheService.deleteToken(userData.userId, userData.deviceId);
  }

  public async findOne(id: string): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return UserPresenter.toResponseDto(user);
  }

  public async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('User already exists');
    }
  }

  public async follow(
    userData: IUserData,
    followUserId: string,
  ): Promise<void> {
    if (userData.userId === followUserId) {
      throw new ConflictException('You cant follow yourself');
    }

    const followUser = await this.userRepository.findOneBy({
      id: followUserId,
    });

    if (!followUser) {
      throw new ConflictException(`User with id ${followUserId} not found`);
    }
    const follow = await this.followRepository.findOneBy({
      followerId: userData.userId,
      followingId: followUserId,
    });

    if (follow) {
      throw new ConflictException(`You are  following this user already`);
    }
    await this.followRepository.save(
      this.followRepository.create({
        followerId: userData.userId,
        followingId: followUserId,
      }),
    );
  }

  public async unFollow(
    userData: IUserData,
    followUserId: string,
  ): Promise<void> {
    if (userData.userId === followUserId) {
      throw new ConflictException('You cant unfollow yourself');
    }

    const followUser = await this.userRepository.findOneBy({
      id: followUserId,
    });

    if (!followUser) {
      throw new ConflictException(`User with id ${followUserId} not found`);
    }
    const follow = await this.followRepository.findOneBy({
      followerId: userData.userId,
      followingId: followUserId,
    });
    if (!follow) {
      throw new ConflictException(`You are not following this user`);
    }
    await this.followRepository.delete(
      this.followRepository.create({
        followerId: userData.userId,
        followingId: followUserId,
      }),
    );
  }
}
