import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ error: "Error" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const param = searchParams.get("username");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/userStats?username=${param}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json(data, { status: 200 });
};
