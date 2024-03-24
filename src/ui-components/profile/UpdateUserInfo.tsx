"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultProfileImg from "@/../public/default_icons/profileImg.png";

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
import Image from "next/image";

// helpers
import { getToken } from "@/helpers/getToken";

const UpdateUserInfo = ({
  username,
  userId,
  setReRender,
  profileImg,
  desc,
}: {
  userId: string;
  username: string;
  profileImg: string;
  setReRender: any;
  desc: string;
}) => {
  // router
  const router = useRouter();
  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [profileImgState, setProfileImgState] = useState<any>(profileImg);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const isProfileImgLink = typeof profileImgState === "string";

  useEffect(() => {
    if (!isProfileImgLink) {
      return () => URL.revokeObjectURL(URL.createObjectURL(profileImgState));
    }
  }, [profileImgState]);

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
    desc: z.string().min(1, {
      message: "desc is required",
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
      )
      .optional(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desc: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const token = await getToken();

    const formdata = new FormData();
    formdata.append("fileUpload", values.content ? values.content[0] : "test");

    const sendImageToBackend = async () => {
      if (!values.content) {
        return { ok: true };
      }
      return await fetch(`${process.env.NEXT_PUBLIC_CONTENT_API}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENT_API_TOKEN}`,
        },
        body: formdata,
        signal: fileSignal.signal,
      });
    };

    // send content to hygraph
    const fileRes = await sendImageToBackend();

    if (!fileRes?.ok) {
      setLoading(false);
      console.error("Something went wrong while sending content to hygraph!");
      return;
    }

    const file =
      fileRes instanceof Response ? await fileRes?.json() : profileImg;

    // get url from hygraph
    const contentUrl = file.url;

    // give object for updated content
    function giveOnlyUpdatedParts() {
      if (values.desc && values.content) {
        return JSON.stringify({
          info: values.desc,
          profile: contentUrl,
        });
      }
      if (values.desc) {
        return JSON.stringify({
          info: values.desc,
        });
      }
      if (values.content) {
        return JSON.stringify({
          profile: contentUrl,
        });
      }
    }

    // file.mimetype.includes("image");
    const postRes = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/updateuser`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: giveOnlyUpdatedParts(),
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
    setReRender((prev: number) => prev + 1);
    router.refresh();
    console.log("records updated!");
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
      <DialogTrigger asChild className="mt-3 ml-3">
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent
        className=""
        onInteractOutside={handleDialogOverlayClickWhileSubmitting}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Edit your data here. Click Edit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field: { onChange }, ...field }) => {
                  // Get current images value (always watched updated)
                  const content = form.watch("content");

                  return (
                    <FormItem className="grid grid-cols-4 items-center gap-4 w-full">
                      <FormLabel className="text-left overflow-hidden w-[130px] h-[140px] flex flex-col">
                        <p>Profile</p>

                        <div className="profile my-auto rounded-full border-2 border-[var(--border)] w-[100px] h-[100px] overflow-hidden ">
                          <div className="img w-full h-full relative ">
                            <Image
                              src={
                                !isProfileImgLink
                                  ? URL.createObjectURL(profileImgState)
                                  : profileImgState
                              }
                              alt="profile-image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </FormLabel>
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
                            const file = event.target.files?.[0] || null;
                            setProfileImgState(file);
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
                name="desc"
                disabled={loading}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4 w-full">
                    <FormLabel className="text-left">Desc</FormLabel>
                    <FormControl>
                      <Input
                        id="desc"
                        placeholder={desc}
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
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserInfo;
