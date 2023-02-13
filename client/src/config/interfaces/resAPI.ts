export interface ResUser {
  userInfo: {
    username: string;
    displayname?: string;
    email: string;
    userType: string;
    description?: string;
    createdAt: string;
    deletedAt?: string;
    avatarURL?: string;
  };
  accessToken: string;
}

export interface ResUserInfo {
  username: string;
  displayname?: string;
  email: string;
  userType: string;
  description?: string;
  createdAt: string;
  deletedAt?: string;
  avatarURL?: string;
}

export interface ResPost {
  [key: string]: unknown;
  id: number;
  title: string;
  content: string;
  groupID: number;
  userID: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
