import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin-api";

export async function GET(request: NextRequest) {
  const { error } = requireAdminApi(request);

  if (error) {
    return error;
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (caughtError) {
    console.error("Error fetching users:", caughtError);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { error } = requireAdminApi(request);

  if (error) {
    return error;
  }

  try {
    const body = await request.json();
    const { name, email, role } = body as {
      name?: string;
      email?: string;
      role?: string;
    };

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (caughtError) {
    console.error("Error creating user:", caughtError);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
