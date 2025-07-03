import { NextResponse } from "next/server";

export function apiResponse(
  code: number = 200,
  msg: string = "",
  data: null | [] | object = []
): NextResponse {
  return NextResponse.json({ message: msg, data: data }, { status: code });
}
