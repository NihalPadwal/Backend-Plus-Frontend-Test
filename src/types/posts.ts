export default interface POSTS_TYPES {
  image?: string;
  video?: string;
  typeOfPost: "video" | "image";
  userID: string;
  postID: string;
}
