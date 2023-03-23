export interface User {
  getAllUsers: User[] | undefined;
  id: number;
  name: string;
  username: string;
  password: string;
}

export interface UpdateForm {
  username: string;
  oldPassword: string;
  newPassword: string;
}