"use client";

import POSTS_TYPES from "@/types/posts";
import Image from "next/image";

const UserPosts = ({ data }: { data: POSTS_TYPES[] }) => {
  return (
    <div className="mt-10 mb-10 w-full gap-3 grid grid-cols-6">
      {data.map((_obj) => {
        return (
          <div className="post" key={_obj._id}>
            {_obj.isImage && (
              <div className="post_wrapper relative h-[30vh] w-full object-cover cursor-pointer">
                <Image
                  src={_obj.contentUrl}
                  alt="asd"
                  fill={true}
                  objectFit="cover"
                  priority
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserPosts;
