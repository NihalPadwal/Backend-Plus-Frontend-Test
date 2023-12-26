"use client";

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

const UserPosts = ({ data }: { data: POSTS_TYPES[] }) => {
  return (
    <div className="mt-10 mb-10 w-full gap-3 grid grid-cols-6">
      {data.map((_obj) => {
        return (
          <Dialog key={_obj._id}>
            <DialogTrigger>
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
                  <ScrollArea className="mt-5 h-[40vh] w-full rounded-md border">
                    <div className="p-3">Comment 1</div>
                    <Separator className="my-2" />
                    <div className="p-3">Comment 2</div>
                    <Separator className="my-2" />
                    <div className="p-3">Comment 3</div>
                    <Separator className="my-2" />
                    <div className="p-3">Comment 4</div>
                    <Separator className="my-2" />
                    <div className="p-3">Comment 5</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 6</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 7</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 8</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 9</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 10</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 11</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 12</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 13</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 14</div>
                    <Separator className="mt-2" />
                    <div className="p-3">Comment 15</div>
                    <Separator className="mt-2" />
                  </ScrollArea>
                  <div className="mt-5 flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Comment" />
                    <Button type="submit">Comment</Button>
                  </div>
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
