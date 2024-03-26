"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/helpers/icons";
import { getToken } from "@/helpers/getToken";

// shadcn-ui
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

// types
import COMMENTS_TYPES from "@/types/comments";

import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import Comment from "../comment";

const IconHeartSvg = Icons["heart"];
const IconHeartFillSvg = Icons["heartFill"];

type Props = {
  _id: string;
  data?: any;
  loggedInUserId: {
    userID: string;
    username: string;
  };
};

const img = "https://media.graphassets.com/fyKG82MzTbOjaLmi6Nf8";

const Post = (props: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState(props.data.likeCount);
  const [user, setUser] = useState<{
    username: string;
    profile: string;
    _id: string;
  }>(props.data.userID);
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComment] = useState<COMMENTS_TYPES[] | undefined>();

  // to abort create post requests
  const commentsSignal = new AbortController();

  const likePost = async () => {
    setIsLiked(!isLiked);
    setLikes((prev: number) => {
      if (!isLiked) {
        return prev + 1;
      }

      return 0;
    });
  };

  // function to get comments
  async function getComments({ id }: { id: string }) {
    setLoading(true);
    const resToken = await fetch("/api/getcookie");

    if (!resToken.ok) {
      throw Error("No token found");
    }

    const tokenData = await resToken.json();
    const token = tokenData.token.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/comments?postId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: commentsSignal.signal,
      }
    );

    const comments = await res.json();
    setComment(comments);
    setLoading(false);
  }

  // function to create comment
  async function createComment(e: any, id: any) {
    setLoading(true);

    e.preventDefault();
    const value = e.target.comment.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/createComment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user?.username,
          postId: id,
          comment: value,
          commentorId: props.loggedInUserId.userID,
        }),
      }
    );

    if (!res.ok) {
      return;
    }

    toast.success("Successfully Created Comment!");

    getComments({ id: id });
    setLoading(false);
  }

  // show comments
  async function showComments(value: boolean) {
    if (value) {
      getComments({ id: props._id });
    }
  }

  return (
    <div className="w-max p-4  rounded-md border max-w-[700px] mt-5">
      <Toaster richColors />
      <Link
        href={user?.username ? `/${user.username}` : "/"}
        className="user flex gap-1 items-center"
      >
        {user && (
          <div className="h-[50px] w-[50px] relative rounded-full overflow-hidden border-[var(--border)] border-2">
            <Image
              src={user?.profile}
              alt="comment-profile-image"
              fill
              className="object-cover"
            />
          </div>
        )}
        {!user && (
          <Skeleton className="bg-gray-600 h-[50px] w-[50px] rounded-full" />
        )}
        <div className="font-bold">
          {user && user?.username}
          {!user && (
            <Skeleton className="bg-gray-600 h-[15px] w-[50px] rounded-full" />
          )}
        </div>
      </Link>

      <Image
        src={props.data.contentUrl}
        alt="Photo by Drew Beamer"
        height={1000}
        width={1000}
        className="rounded-md aspect-[16/9] object-contain h-full my-5"
      />
      <div className="w-max">
        <button
          className="cursor-pointer flex items-center gap-1"
          onClick={likePost}
        >
          <p>{likes}</p>
          {isLiked ? <IconHeartFillSvg /> : <IconHeartSvg />}
        </button>
      </div>
      <div className="w-full font-bold">{props.data.caption}</div>
      <Dialog onOpenChange={(value) => showComments(value)}>
        <DialogTrigger>
          <div className="mt-5 cursor-pointer bg-primary text-white p-2 text-sm rounded-sm">
            Comments
          </div>
        </DialogTrigger>
        <DialogContent className="">
          <DialogTitle className="">Comments</DialogTitle>
          <DialogDescription>
            <ScrollArea className="h-[60vh] w-full rounded-md">
              {!loading &&
                comments?.map((item, index) => {
                  return (
                    <Comment
                      key={index}
                      text={item.comment}
                      likeCount={item.likes}
                      id={item._id}
                      userId={props.data.userID._id || ""}
                      isAlreadyLiked={item.likedBy.includes(
                        props.data.userID_id || ""
                      )}
                      username={item.commentorId.username}
                      profile={item.commentorId.profile}
                    />
                  );
                })}
              {loading && <p className="text-xs">Loading...</p>}
            </ScrollArea>
            <form
              onSubmit={(e) => createComment(e, props._id)}
              className="mt-5 flex w-full  items-center space-x-2"
            >
              <Input
                disabled={loading}
                type="text"
                name="comment"
                placeholder="Comment"
              />
              <Button disabled={loading} type="submit">
                Comment
              </Button>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
