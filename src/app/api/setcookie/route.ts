import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  const { token } = await request.json();
  const cookieStore = cookies();
  cookieStore.set("token", `${token}`);

  return NextResponse.json(
    { msg: "This Api worked", token: token },
    { status: 200 }
  );
};
