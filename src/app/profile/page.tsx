import getUser from "@/helpers/getUsersViaServer";
import UserInfo from "@/ui-components/profile/UserInfo";
import POSTS_TYPES from "@/types/posts";
import UserPosts from "@/ui-components/profile/UserPosts";

type Props = {};

const post: POSTS_TYPES = {
  postID: "zxc",
  typeOfPost: "image",
  userID: "asd",
  image:
    "https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc=",
};

const posts: { data: POSTS_TYPES[] } = {
  data: [
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
    post,
  ],
};

const Index = async (props: Props) => {
  const user = await getUser();
  return (
    <div className="w-full px-20 py-8">
      <UserInfo username={user.username} profileImg={user.profile} />
      <UserPosts data={posts.data} />
    </div>
  );
};

export default Index;
