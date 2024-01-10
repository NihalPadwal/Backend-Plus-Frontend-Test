"use client";
import { revalidateTag } from "next/cache";

// shadcn-ui
import { Button } from "@/components/ui/button";
import { followUser } from "@/helpers/followUser";
import { getFollowedStatus } from "@/helpers/getFollowedStatus";
import { useEffect, useState } from "react";

interface Props {
  username: string;
  userId: any;
  // postLength: number;
  // followers: number;
  // following: number;
  isLoggedInUser: boolean;
  isFollowed?: boolean;
}

const UserStats = ({
  username,
  userId,
  // postLength,
  // followers,
  // following,
  isLoggedInUser,
  isFollowed,
}: Props) => {
  const [followed, setFollowed] = useState<boolean>(isFollowed || false);
  const [stats, setStats] = useState<{
    followers: number;
    following: number;
    postLength: number;
  }>({
    followers: 0,
    following: 0,
    postLength: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const follow = async () => {
    setLoading(true);
    setFollowed(!followed);
    if (!followed) {
      setStats({ ...stats, followers: stats.followers + 1 });
    } else {
      setStats({ ...stats, followers: stats.followers - 1 });
    }

    try {
      const res = await followUser({ userId: userId });

      const isFollowedRes = await fetch(
        `/api/checkFollowStatus?userId=${userId}`
      );

      const isFollowed = await isFollowedRes.json();

      setFollowed(isFollowed);
    } catch {
      setFollowed(isFollowed || false);
      setLoading(false);
    }

    setLoading(false);
  };

  const getStats = async () => {
    setLoading(true);
    const res = await fetch(`/api/getUserStats?username=${username}`);

    if (!res.ok) {
      setLoading(false);
      throw Error;
    }

    const data = await res.json();

    setStats({
      followers: data.followerCount,
      following: data.followingCount,
      postLength: data.postLength,
    });
    setLoading(false);
  };

  useEffect(() => {
    getStats();
  }, []);

  if (loading) {
    return <p>Loading Stats...</p>;
  }

  return (
    <div className="counts flex items-center gap-6 mb-2">
      <div className="posts">
        <span>{stats.postLength}</span>
        <span className="ml-2">Posts</span>
      </div>
      <div className="followers">
        <span>{stats.followers}</span>
        <span className="ml-2">Followers</span>
      </div>
      <div className="following flex items-center">
        <span>{stats.following}</span>
        <span className="ml-2">Following</span>
        {!isLoggedInUser && (
          <Button
            className="ml-5"
            onClick={follow}
            type="submit"
            variant={followed ? "secondary" : "outline"}
            disabled={loading}
          >
            {followed ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserStats;
