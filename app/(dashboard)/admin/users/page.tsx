import { prisma } from "@/lib/prisma";
import { UserManagement } from "@/components/admin/UserManagement";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <UserManagement
      initialUsers={users.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }))}
    />
  );
}
