type Props = {
  username?: string;
};

export async function getPostsClient(props: Props) {
  // username params
  const usernameparams = props?.username ? `?username=${props.username}` : "";

  const tokenRes = await fetch("/api/getcookie");

  if (!tokenRes.ok) {
    throw Error("No token found");
  }

  const tokenData = await tokenRes.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts${usernameparams}`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.token.value}`,
      },
    }
  );

  const data = await res.json();

  return data;
}
