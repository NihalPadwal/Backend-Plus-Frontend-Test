import { CardWithForm } from "@/ui-components/login-account";
import Header from "@/ui-components/header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex  flex-col items-center justify-between p-24">
        <h1 className="font-bold text-5xl mb-20">This is Home page!</h1>
        <h3 className="font-semibold">Welcome back Nihal!</h3>
      </main>
    </>
  );
}
