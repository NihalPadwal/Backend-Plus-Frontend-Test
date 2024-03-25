import getFeed from "@/helpers/getFeed";

// shadcn ui
import { ScrollArea } from "@/components/ui/scroll-area";

// component
import Post from "@/ui-components/profile/Post";

type Props = {};

const Index = async (props: Props) => {
  const data = await getFeed({});

  if (data.error) {
    return;
  }

  return (
    <div className="flex w-full h-[90vh] px-20 py-8">
      <ScrollArea className="h-full w-full rounded-md">
        <div className="h-full w-full flex flex-col items-center justify-center">
          {data.posts.map((item: { _id: string }) => {
            return <Post key={item._id} _id={item._id} data={item} />;
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Index;
