export class User {
  _id?: string;
  type: string;
  user: {
    name: string;
    email: string;
  };
  role: string;
}
