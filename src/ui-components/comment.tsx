"use client";
import { useEffect, useState } from "react";

import POSTS_TYPES from "@/types/posts";
import Image from "next/image";

// shadcn ui
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Toaster, toast } from "sonner";

// icon
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

// TYPES
import COMMENTS_TYPES from "@/types/comments";
import { getPostsClient } from "@/helpers/getPostsClient";
import { getToken } from "@/helpers/getToken";
import Link from "next/link";

const Comment = ({
  text,
  likeCount,
  id,
  userId,
  isAlreadyLiked,
  username,
  profile,
}: {
  text: string;
  likeCount: number;
  id: string;
  userId: string;
  isAlreadyLiked: boolean;
  username: string;
  profile: string;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(isAlreadyLiked);
  const [likes, setLikes] = useState<number>(likeCount);
  const [loading, setLoading] = useState<boolean>(false);

  async function likeComment() {
    setLoading(true);

    const letLikes = isLiked ? likes - 1 : likes + 1;

    setLikes(letLikes);

    const resToken = await fetch("/api/getcookie");

    if (!resToken.ok) {
      throw Error("No token found");
    }

    const tokenData = await resToken.json();
    const token = tokenData.token.value;

    fetch(`${process.env.NEXT_PUBLIC_API}/api/likeComment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        likes: `${letLikes}`,
        likedById: userId,
      }),
    });

    setIsLiked(!isLiked);
    setLoading(false);
  }

  return (
    <div>
      <div className="flex items-center  pl-3 pt-3">
        <Link href={`/${username}`} className="user flex gap-1 items-center">
          <div className="h-[30px] w-[30px] relative rounded-full overflow-hidden border-[var(--border)] border-2">
            <Image
              src={
                profile ||
                "https://worksbynihal-social-app.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FprofileImg.7b8b0f2a.png&w=1920&q=75"
              }
              alt="comment-profile-image"
              fill
              className="object-cover"
            />
          </div>
          <p className="font-bold">{username}</p>
        </Link>
        <div className="p-3 flex items-center justify-between flex-1">
          {text}
          <div
            onClick={likeComment}
            className={`text-center cursor-pointer ${
              loading && "pointer-events-none"
            }`}
          >
            {isLiked ? (
              <HeartFilledIcon className="" />
            ) : (
              <HeartIcon className="" />
            )}
            <p className="text-xs mt-auto text-black">{likes}</p>
          </div>
        </div>
      </div>
      <Separator className="mt-2" />
    </div>
  );
};

export default Comment;
