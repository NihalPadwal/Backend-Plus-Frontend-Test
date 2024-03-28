"use client";
import { useEffect, useState } from "react";

// shadcn ui
import { ScrollArea } from "@/components/ui/scroll-area";

// component
import Post from "@/ui-components/profile/Post";
import getFeed from "@/helpers/getFeed";

import { getToken } from "@/helpers/getToken";

type Props = {
  data: any;
};

const FeedContainer = (props: Props) => {
  const [loggedInUserId, setLoggedInUserId] = useState<{
    userID: string;
    username: string;
  }>({ userID: "", username: "" });
  const [posts, setPosts] = useState(props.data.posts);
  const [pagination, setPagination] = useState({ limit: 10, skip: 0 });

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

  async function fetchNextPosts() {
    const nextPage = {
      limit: pagination.limit + 10,
      skip: pagination.skip + 10,
    };
    const res = await getFeed(nextPage);
    setPagination(nextPage);

    const nextPosts = [...posts, ...res.posts];

    setPosts(nextPosts);
    console.log(nextPosts);
  }

  useEffect(() => {
    const scrollAreaScrollable = document.querySelector(
      ".scrollArea > div"
    ) as HTMLDivElement;

    const onScroll = () => {
      if (scrollAreaScrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollAreaScrollable;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight;

        if (isNearBottom) {
          fetchNextPosts();
          console.log("Reached bottom");
          // DO SOMETHING HERE
        }
      }
    };

    scrollAreaScrollable.addEventListener("scroll", onScroll);

    return () => {
      scrollAreaScrollable.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <ScrollArea className="h-full w-full rounded-md scrollArea">
      <div className="h-full w-full flex flex-col items-center justify-center">
        {loggedInUserId.userID !== "" &&
          posts.map((item: { _id: string }) => {
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
