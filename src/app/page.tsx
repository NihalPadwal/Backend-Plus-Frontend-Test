import { cookies } from "next/headers";

const getUser = async () => {
  const token = cookies().get("token");

  const userDataRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const userDataResult = await userDataRes.json();

  return userDataResult;
};

export default async function Home() {
  const user = await getUser();
  return (
    <>
      <main className="flex  flex-col items-center justify-between p-24">
        <h1 className="font-bold text-5xl mb-20">This is Home page!</h1>
        <h3 className="font-semibold">Welcome back {user.username}!</h3>
      </main>
    </>
  );
}
