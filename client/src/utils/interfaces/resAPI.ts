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
