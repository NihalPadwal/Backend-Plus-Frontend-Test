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

// icon
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

// TYPES
import COMMENTS_TYPES from "@/types/comments";

const UserPosts = ({ data }: { data: POSTS_TYPES[] }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComment] = useState<COMMENTS_TYPES[] | undefined>();
  const [userId, setUserId] = useState<
    { _id: string; username: string } | undefined
  >();

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
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const comments = await res.json();
    setComment(comments);
    setLoading(false);
  }

  // runs when pop up opens or closes
  function openPost(id: string, isOpen: boolean) {
    if (!isOpen) getComments({ id: id });
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
          username: userId?.username,
          postId: id,
          comment: value,
        }),
      }
    );

    getComments({ id: id });
    setLoading(false);
  }

  async function fetchUserID() {
    const resToken = await fetch("/api/getcookie");

    if (!resToken.ok) {
      throw Error("No token found");
    }

    const tokenData = await resToken.json();
    const token = tokenData.token.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUserId(data);
  }

  useEffect(() => {
    fetchUserID();
  }, []);

  return (
    <div className="mt-10 mb-10 w-full gap-3 grid grid-cols-6">
      {data.map((_obj) => {
        return (
          <Dialog key={_obj._id} onOpenChange={(e) => openPost(_obj._id, e)}>
            <DialogTrigger onClick={() => getComments({ id: _obj._id })}>
              <div className="post">
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
            </DialogTrigger>
            <DialogContent className="grid-cols-2 min-w-[70vw]">
              <DialogHeader className="justify-center">
                <Image
                  src={_obj.contentUrl}
                  alt="Photo by Drew Beamer"
                  height={500}
                  width={500}
                  className="rounded-md"
                />
              </DialogHeader>
              <div>
                <DialogTitle className="w-[300px]">
                  Caption: {_obj.caption}
                </DialogTitle>
                <DialogDescription>
                  <ScrollArea className="mt-5 h-[40vh] w-full rounded-md border ">
                    {comments &&
                      comments?.map((item, index) => {
                        return (
                          <Comment
                            key={index}
                            text={item.comment}
                            likeCount={item.likes}
                            id={item._id}
                            userId={userId?._id || ""}
                            isAlreadyLiked={item.likedBy.includes(
                              userId?._id || ""
                            )}
                          />
                        );
                      })}
                    {loading && <p className="text-xs">Loading...</p>}
                  </ScrollArea>
                  <form
                    onSubmit={(e) => createComment(e, _obj._id)}
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
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};

export default UserPosts;

const Comment = ({
  text,
  likeCount,
  id,
  userId,
  isAlreadyLiked,
}: {
  text: string;
  likeCount: number;
  id: string;
  userId: string;
  isAlreadyLiked: boolean;
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
        likes: letLikes,
        likedById: userId,
      }),
    });

    setIsLiked(!isLiked);
    setLoading(false);
  }
  return (
    <div>
      <div className="p-3 flex items-center justify-between ">
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
      <Separator className="mt-2" />
    </div>
  );
};
