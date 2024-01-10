type Props = {
  userId: string;
};

export async function followUser(props: Props) {
  const getToken = await fetch("/api/getcookie");

  const tokenData = await getToken.json();
  const token = await tokenData.token.value;

  if (!token) {
    throw Error("No token found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/followUser`, {
    next: { tags: ["followUser"] },
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toUser: props.userId,
    }),
  });

  const data = await res.json();

  return data;
}
