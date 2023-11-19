// "use client";

// import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Home() {
  // const [user, setUser] = useState<
  //   | {
  //       username: String;
  //       email: String;
  //       profile: String;
  //       isAuthenticated: Boolean;
  //     }
  //   | undefined
  // >();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userRes = await fetch("/api/getcookie");
  //     const userResult = await userRes.json();

  //     if (!userRes.ok) {
  //       window.location.href = "/auth/login";
  //     }

  //     const token = await userResult.token.value;

  //     const userDataRes = await fetch(
  //       `${process.env.NEXT_PUBLIC_API}/api/user`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const userDataResult = await userDataRes.json();
  //     setUser(userDataResult);
  //   };

  //   fetchUser();
  //   return () => {};
  // }, []);

  // if (user) {
  //   return (
  //     <>
  //       <main className="flex  flex-col items-center justify-between p-24">
  //         <h1 className="font-bold text-5xl mb-20">This is Home page!</h1>
  //         <h3 className="font-semibold">Welcome back {user.username}!</h3>
  //       </main>
  //     </>
  //   );
  // }

  // return <></>;

  const data = await getServerSession();
  console.log(data);

  return (
    <>
      <main className="flex  flex-col items-center justify-between p-24">
        <h1 className="font-bold text-5xl mb-20">This is Home page!</h1>
        <p>{`${JSON.stringify(data)}`}</p>
        {/* <h3 className="font-semibold">Welcome back {user.username}!</h3> */}
      </main>
    </>
  );
}
