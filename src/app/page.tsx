import getUser from "@/helpers/getUsersViaServer";

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
