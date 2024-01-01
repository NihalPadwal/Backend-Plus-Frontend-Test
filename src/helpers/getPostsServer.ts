import { cookies } from "next/headers";

type Props = {
  username?: string;
};

export async function getPostsServer(props: Props) {
  // username params
  const usernameparams = props?.username ? `?username=${props.username}` : "";

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw Error("No token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts${usernameparams}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  const data = await res.json();

  return data;
}
