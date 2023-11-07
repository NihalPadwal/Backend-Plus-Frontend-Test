import { CardWithFormVerifyOtp } from "@/ui-components/verify-otp";

type Props = {};

const Index = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardWithFormVerifyOtp />
    </main>
  );
};

export default Index;
