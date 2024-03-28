import getFeed from "@/helpers/getFeed";

// shadcn ui

// component
import FeedContainer from "@/ui-components/feed/FeedContainer";

type Props = {};

const Index = async (props: Props) => {
  const data = await getFeed({});

  if (data.error) {
    return;
  }

  return (
    <div className="flex w-full h-[calc(100vh-100px)] px-20 py-8">
      <FeedContainer data={data} />
    </div>
  );
};

export default Index;
