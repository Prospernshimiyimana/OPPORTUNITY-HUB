import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";

export function requireAdminApi(request: NextRequest) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return {
      admin: null,
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  return {
    admin,
    error: null,
  };
}
