"use client";

import React, { useState } from "react";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";

type Props = {
  user: any;
  isLoggedInUser: boolean;
  isFollowed?: boolean;
};

const AccountContainer = ({ user, isLoggedInUser, isFollowed }: Props) => {
  const [reRedner, setReRender] = useState<number>(0);
  return (
    <div className="w-full px-20 py-8">
      <UserInfo
        username={user.username}
        profileImg={user.profile}
        userId={user["_id"]}
        info={user.info}
        isLoggedInUser={isLoggedInUser}
        isFollowed={isFollowed}
        setReRender={setReRender}
      />
      <UserPosts
        userId={user["_id"]}
        username={user.username}
        reRedner={reRedner}
      />
    </div>
  );
};

export default AccountContainer;
