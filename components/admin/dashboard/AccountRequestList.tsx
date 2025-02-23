import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";

const AccountRequestList = ({
  data,
  className,
}: {
  data: UserData[];
  className: HTMLDivElement["className"];
}) => {
  return (
    <div className={cn("stat", className)}>
      <div className="stat-info">
        <h2 className="font-semibold text-lg text-gray-700">
          Account Requests
        </h2>
        <Button className="view-btn" asChild>
          <Link href="/admin/account-requests">View All</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 max-h-[calc(100%-56px)] overflow-y-auto justify-center scroller">
        {data.map((user) => (
          <AccountRequestCard
            key={user.id}
            fullName={user.fullName}
            email={user.email}
            id={user.id}
          />
        ))}
      </div>
    </div>
  );
};

export const AccountRequestCard = ({
  fullName,
  email,
  id,
  className,
}: {
  fullName: string;
  email: string;
  id: string;
  className?: HTMLDivElement["className"];
}) => {
  return (
    <div className={cn("user-card", className)}>
      <Avatar>
        <AvatarFallback className="bg-amber-100">
          {getInitials(fullName || "IN")}
        </AvatarFallback>
      </Avatar>
      <h3 className="name" title={fullName}>
        {fullName}
      </h3>
      <p className="email" title={email}>
        {email}
      </p>
      {/* <div className="flex items-center gap-2">
      </div> */}
    </div>
  );
};

export default AccountRequestList;
