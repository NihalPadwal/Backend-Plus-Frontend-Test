import Image from "next/image";
import DefaultProfileImg from "@/../public/default_icons/profileImg.png";

import CreatePost from "./CreatePost";

interface Props {
  username: string;
  profileImg: string;
  userId: any;
  postLength: number;
  followers: number;
  following: number;
  profile: string;
  info: string;
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
}: Props) => {
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
        <div className="counts flex gap-6 mb-2">
          <div className="posts">
            <span>{postLength}</span>
            <span className="ml-2">Posts</span>
          </div>
          <div className="followers">
            <span>{followers}</span>
            <span className="ml-2">Followers</span>
          </div>
          <div className="following">
            <span>{following}</span>
            <span className="ml-2">Following</span>
          </div>
        </div>
        <div className="desc">{info || "Desc"}</div>
        <CreatePost username={username} userId={userId} />
      </div>
    </div>
  );
};

export default UserInfo;
