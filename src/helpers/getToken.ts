export async function getToken() {
  const res = await fetch("/api/getcookie");

  if (!res.ok) {
    throw Error("No token found");
  }

  const data = await res.json();

  const token = await data.token.value;

  return token;
}
