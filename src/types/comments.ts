export default interface COMMENTS_TYPES {
  _id: string;
  comment: string;
  likes: number;
  postId: string;
  repliedToID: string;
  likedBy: string[];
  commentorId: {
    username: string;
    profile: string;
  };
}
