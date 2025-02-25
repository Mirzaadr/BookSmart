import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/lib/prisma";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db.user
    .findUnique({
      where: { id: session.user.id },
    })
    .then((res) => res?.role === "ADMIN");

  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />

      <div className="admin-container min-w-[360px]">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
