import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return NextResponse.json({ msg: "Token Deleted" }, { status: 200 });
};
