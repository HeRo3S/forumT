export interface ReqUser {
  username?: string;
  email?: string;
  password?: string;
}

export interface ReqPost {
  title: string;
  content: string;
  type: string;
}
