import Image from "next/image";
import DefaultProfileImg from "@/../public/default_icons/profileImg.png";

import CreatePost from "./CreatePost";

interface Props {
  username: string;
  profileImg: string;
  userId: any;
  postLength: number;
}

const UserInfo = ({ username, profileImg, userId, postLength }: Props) => {
  return (
    <div className="w-full flex">
      <div className="profile rounded-full border-2 border-[var(--border)] w-[100px] h-[100px] overflow-hidden p-5">
        <div className="img  w-full h-full relative ">
          <Image
            src={profileImg ? profileImg : DefaultProfileImg}
            alt="profile-image"
            fill
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
            <span>0</span>
            <span className="ml-2">Followers</span>
          </div>
          <div className="following">
            <span>0</span>
            <span className="ml-2">Following</span>
          </div>
        </div>
        <div className="name mb-2">User Test</div>
        <div className="desc">User desc</div>
        <CreatePost username={username} userId={userId} />
      </div>
    </div>
  );
};

export default UserInfo;
