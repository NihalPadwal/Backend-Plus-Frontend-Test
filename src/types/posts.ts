export default interface POSTS_TYPES {
  image?: string;
  video?: string;
  typeOfPost: "video" | "image";
  userID: string;
  postID: string;
}

export interface POSTS_ARRAY_TYPES {
   POSTS_TYPES[];
}
