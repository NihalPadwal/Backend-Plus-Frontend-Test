import { CardWithFormCreateAccount } from "@/ui-components/create-account";

type Props = {};

const Index = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardWithFormCreateAccount />
    </main>
  );
};

export default Index;
