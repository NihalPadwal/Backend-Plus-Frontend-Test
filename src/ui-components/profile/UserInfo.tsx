import Image from "next/image";
import DefaultProfileImg from "@/../public/default_icons/profileImg.png";
import { revalidateTag } from "next/cache";
import CreatePost from "./CreatePost";

// shadcn-ui
import { Button } from "@/components/ui/button";
import { followUser } from "@/helpers/followUser";
import { useRef } from "react";

// UI
import UserStats from "./UserStats";
import UpdateUserInfo from "./UpdateUserInfo";

interface Props {
  username: string;
  profileImg: string;
  userId: any;
  // postLength: number;
  // followers: number;
  // following: number;
  // profile: string;
  info: string;
  isLoggedInUser: boolean;
  isFollowed?: boolean;
  setReRender?: any;
}

const UserInfo = ({
  username,
  profileImg,
  userId,
  info,
  isLoggedInUser,
  isFollowed,
  setReRender,
}: Props) => {
  return (
    <div className="w-full flex">
      <div className="profile rounded-full border-2 border-[var(--border)] w-[100px] h-[100px] overflow-hidden ">
        <div className="img w-full h-full relative ">
          <Image
            src={profileImg}
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
        <UserStats
          username={username}
          userId={userId}
          isLoggedInUser={isLoggedInUser}
          isFollowed={isFollowed}
        />
        <div className="desc">{info || "Desc"}</div>
        {isLoggedInUser && (
          <>
            <CreatePost
              username={username}
              userId={userId}
              setReRender={setReRender}
            />
            <UpdateUserInfo
              username={username}
              userId={userId}
              profileImg={profileImg}
              setReRender={setReRender}
              desc={info}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
