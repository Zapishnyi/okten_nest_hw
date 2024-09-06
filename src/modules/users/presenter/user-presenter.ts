import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/IUserData';
import { UserResDto } from '../dto/res/user.res.dto';

export class UserPresenter {
  public static toResponseDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      created: user.created,
      updated: user.updated,
    };
  }

  public static toIUserData({ userId, deviceId, email }: IUserData): IUserData {
    return {
      userId,
      deviceId,
      email,
    };
  }
}
