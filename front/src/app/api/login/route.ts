// Auth0 BFF

import { AuthenticationServiceAdapter } from "@/services/authentication-service/adapter";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const token = await new AuthenticationServiceAdapter().auth({
    user: username,
    pass: password,
  });

  return NextResponse.json({ token });
}
