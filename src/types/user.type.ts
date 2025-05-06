export type User = {
  id: string;
  email: string;
  fullname: string;
  image: string;
  role?: string;
  type?: string;
  phone?: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
};
