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
  groupname: string;
  username: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
export interface ResGroupInfo {
  [key: string]: unknown;
  id: number;
  groupname: string;
  displayname?: string;
  ownername: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  avatarURL: string;
}

export interface ResComment {
  [key: string]: unknown;
  id: number;
  content: string;
  parentPostId: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ResPostReact {
  [key: string]: unknown;
  id: number;
  username: string;
  postID: number;
  reaction: string;
}

export interface ResCommentReact {
  [key: string]: unknown;
  id: number;
  username: string;
  commentID: number;
  reaction: string;
}
export interface ReactionStatsProps {
  nUpvote: number;
  nDownvote: number;
  nComments: number;
}

export interface ResAttachment {
  [key: string]: unknown;
  id: number;
  url: string;
  postID: number;
  type: string;
  createdAt: string;
}

export interface ResUserFollowingGroup {
  [key: string]: unknown;
  username: string;
  groupname: string;
  role: string;
  timeUnbanned: string;
}
