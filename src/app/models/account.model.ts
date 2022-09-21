import { AccountState } from "./enums/account-status.enum";

export interface Account {
  id: string;
  userName: string;
  email: string;
  registrationDate: Date;
  lastLoginDate: Date;
  state: AccountState;
}
