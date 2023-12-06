import POSTS_TYPES from "@/types/posts";
import Image from "next/image";

const UserPosts = ({ data }: { data: POSTS_TYPES[] }) => {
  return (
    <div className="mt-10 mb-10 w-full gap-6 grid grid-cols-6">
      {data.map((_obj) => {
        return (
          <div className="post" key={_obj.userID}>
            {_obj.image && (
              <div className="post_wrapper relative h-[200px] object-cover cursor-pointer">
                <Image
                  src={_obj.image}
                  alt="asd"
                  fill={true}
                  objectFit="cover"
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
