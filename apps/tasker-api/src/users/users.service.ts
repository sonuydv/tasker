import { UserModel } from './user.schema';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

export async function getUserByEmail(email:string){
  return UserModel.findOne({email});
}

export async function createUser(createUser:RegisterUserDto){
  return new UserModel(createUser).save();
}


