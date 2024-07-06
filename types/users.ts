import { Role } from './role';

export type UserTableData = {
  accountId: string;
  role: Role;
  email: string;
  passwordHash: string;
  avatarUrl: string;
  userName: string;
  fullName: string;
  phoneNumber: string;
  joinDate: Date;
  roleId: number;
  denyRes: string;
  status: string;
};

export type UserListInfor = {
  totalItem: number;
  pageSize: number;
  totalPages: number;
  pageNumber: number;
  items: UserTableData[];
};
