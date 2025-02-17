import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import config from "@/lib/config";
import { db } from "@/lib/prisma";
import { getInitials } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import ClipSvg from "./ClipSvg";
import UserStatusBadge from "./UserStatusBadge";

const ProfileCard = async ({ userId }: { userId: string }) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return (
    <div className="relative rounded-2xl px-8 py-10 bg-dark-800 min-h-[400px]">
      <ClipSvg className="absolute top-[-20px] md:top-[-30px] h-[60px] md:h-[86px]" />
      <UserStatusBadge
        isApproved={user?.status === "APPROVED"}
        className="md:block size-7 lg:size-12 absolute top-6 md:top-8 right-8 text-primary"
      />
      <div className="flex flex-col space-y-5 lg:space-y-14 ">
        <div className="flex w-full mt-10 lg:mt-16 items-center flex-1 md:flex-none max-w-full">
          <div className="flex gap-5 items-center w-full max-w-full overflow-auto">
            <Avatar className="size-14 lg:size-20">
              <AvatarFallback className="bg-amber-100 text-xl lg:text-3xl font-semibold">
                {getInitials(user?.fullName || "IN")}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col w-full flex-1 max-w-full overflow-auto">
              <p
                className="font-semibold text-lg text-white xs:text-xl truncate"
                title={user?.fullName}
              >
                {user?.fullName}
              </p>
              <p
                className="line-clamp-1 text-sm text-light-100 xs:text-base truncate"
                title={user?.email}
              >
                {user?.email}
              </p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button
              // size="icon"
              variant="ghost"
              className="[&_svg]:size-6 lg:[&_svg]:size-5 h-12 w-12 lg:w-fit rounded-full gap-2 hover:text-dark-100 text-white "
            >
              <LogOutIcon className="text-red-700" />
              <span className="hidden lg:block text-base ">Sign Out</span>
            </Button>
          </form>
        </div>
        <div className="flex flex-col">
          <p className="line-clamp-1 text-base text-light-100 xs:text-base">
            Student ID
          </p>
          <p className="font-semibold text-lg text-white xs:text-xl">
            {user?.universityId}
          </p>
        </div>

        <div
          className="w-full h-[200px] lg:h-[300px] px-5 py-3"
          style={{ position: "relative" }}
        >
          <Image
            alt="university-card"
            src={`${config.env.imageKit.urlEndpoint}${user?.universityCard}`}
            fill
            // urlEndpoint={config.env.imageKit.urlEndpoint}
            loading="lazy"
            // lqip={{ active: true }}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
