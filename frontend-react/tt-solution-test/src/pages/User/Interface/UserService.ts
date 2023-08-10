import { PostUser } from "./PostUser";
import { RequestUser } from "./RequestUser";

export interface UserService {
  getAllUser(): Promise<RequestUser[]>;
  getUserById(id: string): Promise<RequestUser>;
  createUser(data: PostUser): Promise<PostUser>;
  updateUser(id: string, data: any): Promise<PostUser>;
  deleteUser(id: string): Promise<void>;
}
