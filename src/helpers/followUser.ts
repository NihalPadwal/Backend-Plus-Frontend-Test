import { cookies } from "next/headers";

type Props = {
  userId: string;
};

export async function followUser(props: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw Error("No token found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/followUser`, {
    next: { tags: ["followUser"] },
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toUser: props.userId,
    }),
  });

  const data = await res.json();

  return data;
}
