import { CardWithFormLoginAccount } from "@/ui-components/login-account";

type Props = {};

const Index = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardWithFormLoginAccount />
    </main>
  );
};

export default Index;
