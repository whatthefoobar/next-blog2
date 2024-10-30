export interface IPost {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string; // Optional field
  username: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  //   _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
}
