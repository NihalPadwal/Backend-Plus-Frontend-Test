export async function getPostsClient() {
  const tokenRes = await fetch("/api/getcookie");

  if (!tokenRes.ok) {
    throw Error("No token found");
  }

  const tokenData = await tokenRes.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/posts`, {
    headers: {
      Authorization: `Bearer ${tokenData.token.value}`,
    },
  });

  const data = await res.json();

  return data;
}
