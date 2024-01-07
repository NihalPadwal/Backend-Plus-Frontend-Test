"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// shadcn-ui
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";

// zord
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CreatePost = ({
  username,
  userId,
}: {
  userId: String;
  username: String;
}) => {
  const router = useRouter();
  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const contents = "image/jpeg,image/jpg,image/png,image/webp";
  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_CONTENT_TYPES = {
    string: contents,
    arr: contents.split(","),
  };

  // to abort create post requests
  const fileSignal = new AbortController();
  const backendSignal = new AbortController();

  // validation schema
  const formSchema = z.object({
    caption: z.string().min(1, {
      message: "caption is required",
    }),
    content: z
      .custom<FileList>((val) => val instanceof FileList, "Required")
      .refine((files) => files.length > 0, `Content is Required`)
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
        `Each file size should be less than 5 MB.`
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ACCEPTED_CONTENT_TYPES.arr.includes(file.type)
          ),
        `Only these types are allowed ${ACCEPTED_CONTENT_TYPES.arr.map(
          (item) => `.${item.split("/")[1]}`
        )}`
      ),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const formdata = new FormData();
    formdata.append("fileUpload", values.content[0]);

    // send content to hygraph
    const fileRes = await fetch(`${process.env.NEXT_PUBLIC_CONTENT_API}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENT_API_TOKEN}`,
      },
      body: formdata,
      signal: fileSignal.signal,
    });

    if (!fileRes.ok) {
      setLoading(false);
      console.error("Something went wrong while sending content to hygraph!");
      return;
    }

    const file = await fileRes.json();

    // get url from hygraph
    const contentUrl = file.url;

    // file.mimetype.includes("image");

    const postRes = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/createPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${username}`,
          userID: `${userId}`,
          isImage: true,
          isVideo: false,
          contentUrl: `${contentUrl}`,
          likeCount: 0,
          commentCount: 0,
          caption: `${values.caption}`,
        }),
        signal: backendSignal.signal,
      }
    );

    if (!postRes.ok) {
      setLoading(false);
      console.error("Something went wrong while sending data to backend!");
      return;
    }

    const post = await postRes.json();

    form.reset();

    setOpen(false);
    setLoading(false);

    // Force refresh the page
    router.refresh();
  }

  // runs when dialog opens or closes
  function handleDialogOpenStatus(value: boolean) {
    setOpen(!open);
    if (!value) {
      setLoading(false);
      form.reset();
      fileSignal.abort();
      backendSignal.abort();
    }
  }

  // runs when clicked on dialog overlay
  function handleDialogOverlayClickWhileSubmitting(value: any) {
    if (loading) {
      value.preventDefault();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenStatus}>
      <DialogTrigger asChild className="mt-3">
        <Button variant="outline">Create Post</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleDialogOverlayClickWhileSubmitting}
      >
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Add details of your post here. Click Create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field: { onChange }, ...field }) => {
                  // Get current images value (always watched updated)
                  const content = form.watch("content");

                  return (
                    <FormItem className="grid grid-cols-4 items-center gap-4 w-full">
                      <FormLabel className="text-left">Content</FormLabel>
                      <FormControl>
                        <Input
                          id="content"
                          type="file"
                          className="col-span-3"
                          accept={ACCEPTED_CONTENT_TYPES.string}
                          disabled={form.formState.isSubmitting}
                          multiple={false}
                          {...field}
                          onChange={(event) => {
                            // Triggered when user uploaded a new file
                            // FileList is immutable, so we need to create a new one
                            const dataTransfer = new DataTransfer();

                            // Add old images
                            if (content) {
                              Array.from(content).forEach((image) =>
                                dataTransfer.items.add(image)
                              );
                            }

                            // Add newly uploaded images
                            Array.from(event.target.files!).forEach((image) =>
                              dataTransfer.items.add(image)
                            );

                            // Validate and update uploaded file
                            const newFiles = dataTransfer.files;
                            onChange(newFiles);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="caption"
                disabled={loading}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4 w-full">
                    <FormLabel className="text-left">Caption</FormLabel>
                    <FormControl>
                      <Input
                        id="caption"
                        placeholder="@caption"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
