import { UserEntity } from './user.entity';

export type UserDTO = Omit<UserEntity, 'id'>;
