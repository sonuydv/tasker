import bcrypt from 'bcryptjs';

export async function comparePassword(candidate:string,password:string): Promise<boolean> {
  return bcrypt.compare(candidate, password);
}
