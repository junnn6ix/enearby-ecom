import { ChartLineLabel } from "@/components/ChartLine";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { auth, User } from "@clerk/nextjs/server";
import { BadgeCheck, Candy, Citrus, Edit2, Shield } from "lucide-react";

const getData = async (id: string): Promise<User | null> => {
  const { getToken } = await auth();
  const token = await getToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const SingleUserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const data = await getData(id);

  if (!data) {
    return <div>User Not Found</div>;
  }
  return (
    <div className="">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {data?.firstName + "" + data?.lastName || data?.username || "-"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* CONTAINER */}
      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        {/* LEFT */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* USER BADES CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="text-xl font-bold">User Badge</h1>
            <div className="flex gap-4 mt-4">
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className="bg-blue-500/30 border border-blue-500/50 rounded-full p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent align="start" className="cursor-pointer">
                  <h1 className="font-bold mb-2">Verified User</h1>
                  <p className="text-muted-foreground text-sm ">
                    This user has been verified by the admin.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Shield
                    size={36}
                    className="bg-green-500/30 border border-green-500/50 rounded-full p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent align="start" className="cursor-pointer">
                  <h1 className="font-bold mb-2">Verified User</h1>
                  <p className="text-muted-foreground text-sm ">
                    This user has been verified by the admin.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Candy
                    size={36}
                    className="bg-yellow-500/30 border border-yellow-500/50 rounded-full p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent align="start" className="cursor-pointer">
                  <h1 className="font-bold mb-2">Verified User</h1>
                  <p className="text-muted-foreground text-sm ">
                    This user has been verified by the admin.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Citrus
                    size={36}
                    className="bg-red-500/30 border border-red-500/50 rounded-full p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent align="start" className="cursor-pointer">
                  <h1 className="font-bold mb-2">Verified User</h1>
                  <p className="text-muted-foreground text-sm ">
                    This user has been verified by the admin.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* USER CARD CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={data?.imageUrl} />
                <AvatarFallback className="font-bold bg-orange-600/10 text-orange-600">
                  {data?.firstName?.charAt(0) ||
                    data?.username?.charAt(0) ||
                    "-"}
                </AvatarFallback>
              </Avatar>
              <div className=" flex flex-col">
                <h1 className="text-xl font-bold">
                  {data?.firstName + " " + data?.lastName ||
                    data?.username ||
                    "-"}
                </h1>
                <p className="text-muted-foreground">{data?.username || "-"}</p>
              </div>
            </div>
            <p className=" ">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
              mollitia temporibus similique recusandae, maxime deserunt atque,
              quos id cumque facilis repellendus? Consectetur, eveniet
              molestiae! Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
            </p>
          </div>

          {/* INFOS CONTAINERS */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">User Information</h1>
              <Sheet>
                <SheetTrigger>
                  <Edit2 size={16} />
                </SheetTrigger>
                <EditUser user={data} />
              </Sheet>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2 mb-8">
                <p className="text-sm text-muted-foreground">
                  Profile completion
                </p>
                <Progress value={50} />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Full Name:</span>
                <span>
                  {data?.firstName + " " + data?.lastName ||
                    data?.username ||
                    "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Email:</span>
                <span>{data?.emailAddresses[0]?.emailAddress || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Phone:</span>
                <span>{data?.phoneNumbers[0]?.phoneNumber || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Role:</span>
                <span className="capitalize">
                  {(data?.publicMetadata.role as string) || "User"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Status:</span>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full w-max text-xs",
                    data.banned
                      ? "bg-red-500/10 text-red-500"
                      : "bg-green-500/10 text-green-500"
                  )}>
                  {data.banned ? "banned" : "active"}
                </span>
              </div>
              <p className="text-muted-foreground  text-sm mt-4">
                Joined on{" "}
                {new Date(data?.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-2/3 space-y-6">
          {/* CHART CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <ChartLineLabel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
// https://youtu.be/SjsQdfvxjL8?t=6910
