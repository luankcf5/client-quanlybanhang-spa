export type IUser = {
  id: number;
  username: string;
  password: string;
  profile: IProfile;
  status: 'Working' | 'OnHold' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
};

type IProfile = {
  id: number;
  name: string;
  dob: Date;
  gender: 'Male' | 'Female' | 'Other';
};
