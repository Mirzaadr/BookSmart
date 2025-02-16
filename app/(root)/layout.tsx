import Header from "@/components/Header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Layout = async ({
  children
}: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl w-full min-w-[360px]">
        <Header session={session} />
        <div className="md:mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}

export default Layout;