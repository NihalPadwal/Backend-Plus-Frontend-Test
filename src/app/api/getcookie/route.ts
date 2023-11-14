import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return NextResponse.json(
    { msg: "This Api worked", token: token },
    { status: 200 }
  );
};
