import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin-api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = requireAdminApi(request);

  if (error) {
    return error;
  }

  try {
    const { id } = await params;
    const userId = Number(id);
    const body = await request.json();
    const { name, email, role, banned } = body as {
      name?: string;
      email?: string;
      role?: string;
      banned?: boolean;
    };

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        role,
        banned,
      },
    });

    return NextResponse.json(user);
  } catch (caughtError) {
    console.error("Error updating user:", caughtError);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = requireAdminApi(request);

  if (error) {
    return error;
  }

  try {
    const { id } = await params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (caughtError) {
    console.error("Error deleting user:", caughtError);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
