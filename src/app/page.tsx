import { CardWithForm } from "@/ui-components/create-account";
import Header from "@/ui-components/header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CardWithForm />
      </main>
    </>
  );
}
