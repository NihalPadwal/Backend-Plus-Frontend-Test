import getUser from "@/helpers/getUsersViaServer";
import AccountContainer from "@/ui-components/profile/AccountContainer";

type Props = {};

const Index = async (props: Props) => {
  const user = await getUser({});

  if (user.error) {
    return;
  }

  return <AccountContainer user={user} isLoggedInUser={true} />;
};

export default Index;
