"use client";
import { useEffect, useState } from "react";

// shadcn ui
import { ScrollArea } from "@/components/ui/scroll-area";

// component
import Post from "@/ui-components/profile/Post";
import { getToken } from "@/helpers/getToken";

type Props = {
  data: any;
};

const FeedContainer = (props: Props) => {
  const [loggedInUserId, setLoggedInUserId] = useState<{
    userID: string;
    username: string;
  }>({ userID: "", username: "" });

  async function getAuthToken() {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/userid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setLoggedInUserId(data);
  }

  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <ScrollArea className="h-full w-full rounded-md">
      <div className="h-full w-full flex flex-col items-center justify-center">
        {loggedInUserId.userID !== "" &&
          props.data.posts.map((item: { _id: string }) => {
            return (
              <Post
                key={item._id}
                _id={item._id}
                data={item}
                loggedInUserId={loggedInUserId}
              />
            );
          })}
      </div>
    </ScrollArea>
  );
};

export default FeedContainer;
