import { CardWithFormLoginAccount } from "@/ui-components/login-account";

import type { GetServerSidePropsContext } from "next";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { CustomProviders } from "@/app/types";

const getProvidersData = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession();

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const result = await getProviders();

  const providers = result ?? [];

  return providers as CustomProviders;
};

type Props = {};

const Index = async (context: GetServerSidePropsContext) => {
  const providers: any = await getProvidersData(context);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardWithFormLoginAccount providers={providers} />
    </main>
  );
};

export default Index;
