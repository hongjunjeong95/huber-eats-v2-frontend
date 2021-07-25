import { UserRole } from "./__generated__/globalTypes";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}
