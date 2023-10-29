import { CardWithForm } from "@/ui-components/create-account";

type Props = {};

const Index = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardWithForm />
    </main>
  );
};

export default Index;
