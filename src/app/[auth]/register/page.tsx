import { CardWithFormCreateAccount } from "@/ui-components/create-account";
import type { GetServerSidePropsContext } from "next";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { CustomProviders } from "@/app/types";

type Props = {};

const Index = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardWithFormCreateAccount />
    </main>
  );
};

export default Index;
