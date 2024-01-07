import { cookies } from "next/headers";

type Props = {
  selectedUser: string;
};

export async function getFollowedStatus(props: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw Error("No token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/getIsUserAlreadyFollower?selectedUser=${props.selectedUser}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  const data = await res.json();

  return data.isFollowed;
}
