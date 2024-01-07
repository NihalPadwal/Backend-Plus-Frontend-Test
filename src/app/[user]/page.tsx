import getUser from "@/helpers/getUsersViaServer";
import UserInfo from "@/ui-components/profile/UserInfo";
import UserPosts from "@/ui-components/profile/UserPosts";
import { getPostsServer } from "@/helpers/getPostsServer";
import { getFollowedStatus } from "@/helpers/getFollowedStatus";

type Props = {
  params: { user: string };
};

const Index = async (props: Props) => {
  const user = await getUser({ username: props.params.user });
  const posts = await getPostsServer({ username: props.params.user });
  const isFollowed = await getFollowedStatus({ selectedUser: user._id });
  const isLoggedInUser = await user.isLoggedUser;

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
        isLoggedInUser={isLoggedInUser}
        isFollowed={isFollowed}
      />
      <UserPosts data={posts} />
    </div>
  );
};

export default Index;
