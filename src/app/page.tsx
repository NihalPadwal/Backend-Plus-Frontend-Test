import getUser from "@/helpers/getUsersViaServer";
import UserInfo from "@/ui-components/profile/UserInfo";
import UserPosts from "@/ui-components/profile/UserPosts";
import { getPostsServer } from "@/helpers/getPostsServer";

type Props = {};

const Index = async (props: Props) => {
  const user = await getUser({});
  const posts = await getPostsServer({});

  if (user.error) {
    return;
  }

  return (
    <div className="w-full px-20 py-8">
      <UserInfo
        username={user.username}
        profileImg={user.profile}
        userId={user["_id"]}
        postLength={posts.length}
        followers={user.followerCount}
        following={user.followingCount}
        profile={user.profile}
        info={user.info}
        isLoggedInUser={true}
      />
      <UserPosts data={posts} />
    </div>
  );
};

export default Index;
