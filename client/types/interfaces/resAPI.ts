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
  [key: string]: unknown;
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
  user: {
    avatarURL: string;
    username: string;
    displayname: string;
  };
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

export interface IReactionGroupBy {
  reaction: string;
  _count: number;
}
export interface ReactionStatsProps {
  [key: string]: unknown;
  // nUpvote: number;
  // nDownvote: number;
  reactions: IReactionGroupBy[];
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

export interface ResPostReports {
  [key: string]: unknown;
  id: number;
  postID: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  bannedReason: string;
}

export interface ResGroupByPostReports {
  bannedReason: string;
  _count: number;
}
