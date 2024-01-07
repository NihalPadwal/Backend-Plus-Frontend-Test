import Image from "next/image";
import DefaultProfileImg from "@/../public/default_icons/profileImg.png";
import { revalidateTag } from "next/cache";
import CreatePost from "./CreatePost";

// shadcn-ui
import { Button } from "@/components/ui/button";
import { followUser } from "@/helpers/followUser";
import { useRef } from "react";

interface Props {
  username: string;
  profileImg: string;
  userId: any;
  postLength: number;
  followers: number;
  following: number;
  profile: string;
  info: string;
  isLoggedInUser: boolean;
  isFollowed?: boolean;
}

const UserInfo = ({
  username,
  profileImg,
  userId,
  postLength,
  followers,
  following,
  profile,
  info,
  isLoggedInUser,
  isFollowed,
}: Props) => {
  const follow = async () => {
    "use server";

    const res = await followUser({ userId: userId });
    if (res.message) {
      revalidateTag("followUser");
    }
  };

  return (
    <div className="w-full flex">
      <div className="profile rounded-full border-2 border-[var(--border)] w-[100px] h-[100px] overflow-hidden ">
        <div className="img w-full h-full relative ">
          <Image
            src={profileImg ? profileImg : DefaultProfileImg}
            alt="profile-image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="info pl-7">
        <div className="username mb-2">
          <div className="text">{username}</div>
        </div>
        <div className="counts flex items-center gap-6 mb-2">
          <div className="posts">
            <span>{postLength}</span>
            <span className="ml-2">Posts</span>
          </div>
          <div className="followers">
            <span>{followers}</span>
            <span className="ml-2">Followers</span>
          </div>
          <div className="following flex items-center">
            <span>{following}</span>
            <span className="ml-2">Following</span>
            {!isLoggedInUser && (
              <form action={follow} className="ml-5">
                <Button
                  type="submit"
                  variant={isFollowed ? "secondary" : "outline"}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Button>
              </form>
            )}
          </div>
        </div>
        <div className="desc">{info || "Desc"}</div>
        {isLoggedInUser && <CreatePost username={username} userId={userId} />}
      </div>
    </div>
  );
};

export default UserInfo;
