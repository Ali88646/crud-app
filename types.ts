export type User = {
  id?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
};

export type SetUser = React.Dispatch<React.SetStateAction<User | null>>;
