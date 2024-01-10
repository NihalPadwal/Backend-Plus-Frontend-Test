import getUser from "@/helpers/getUsersViaServer";
import { getFollowedStatus } from "@/helpers/getFollowedStatus";
import AccountContainer from "@/ui-components/profile/AccountContainer";

type Props = {
  params: { user: string };
};

const Index = async (props: Props) => {
  const user = await getUser({ username: props.params.user });
  const isFollowed = await getFollowedStatus({ selectedUser: user._id });
  const isLoggedInUser = await user.isLoggedUser;

  if (user.error) {
    return;
  }

  return (
    <AccountContainer
      user={user}
      isFollowed={isFollowed}
      isLoggedInUser={isLoggedInUser}
    />
  );
};

export default Index;
