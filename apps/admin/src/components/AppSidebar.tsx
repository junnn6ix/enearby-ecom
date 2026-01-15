import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  Info,
  MessageCircleQuestionMark,
  Plus,
  Search,
  Settings,
  Shirt,
  ShoppingBasket,
  Tag,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
// import Modal from "./Modal";

import { Sheet, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import AddProduct from "./AddProduct";
import AddOrder from "./AddOrder";
import AddUser from "./AddUser";
import AddCategory from "./AddCategory";
import Logo from "./Logo";

const AppSidebar = () => {
  // Menu items.
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild suppressHydrationWarning>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild suppressHydrationWarning>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.title === "Inbox" && (
                    <SidebarMenuBadge>
                      <Badge>24</Badge>
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Products */}
        <Collapsible className="group/collapsible" defaultOpen>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel>
                Products
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild suppressHydrationWarning>
                      <Link href="/products">
                        <Shirt />
                        See All Products
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    {/* Sheet */}
                    <Sheet>
                      <SidebarMenuButton asChild suppressHydrationWarning>
                        <SheetTrigger asChild>
                          <Link href="#">
                            <Plus />
                            Add Product
                          </Link>
                        </SheetTrigger>
                      </SidebarMenuButton>
                      <AddProduct />
                    </Sheet>
                    {/* Endof Sheet */}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Categories */}
        <Collapsible className="group/collapsible" defaultOpen>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel>
                Categories
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild suppressHydrationWarning>
                      <Link href="/categories">
                        <Tag />
                        See All Categories
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    {/* Sheet */}
                    <Sheet>
                      <SidebarMenuButton asChild suppressHydrationWarning>
                        <SheetTrigger asChild>
                          <Link href="#">
                            <Plus />
                            Add Category
                          </Link>
                        </SheetTrigger>
                      </SidebarMenuButton>
                      <AddCategory />
                    </Sheet>
                    {/* Endof Sheet */}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Payments */}
        <SidebarGroup>
          <SidebarGroupLabel>Order/Payments</SidebarGroupLabel>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuButton asChild suppressHydrationWarning>
                <Link href="/orders">
                  <ShoppingBasket />
                  See All Transactions
                </Link>
              </SidebarMenuButton>

              <SidebarMenuItem>
                <Sheet>
                  <SidebarMenuButton asChild suppressHydrationWarning>
                    <SheetTrigger asChild>
                      <Link href="#">
                        <Plus />
                        Add Order
                      </Link>
                    </SheetTrigger>
                  </SidebarMenuButton>
                  <AddOrder />
                </Sheet>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>

        {/* Users */}
        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuButton asChild suppressHydrationWarning>
                <Link href="/users">
                  <User />
                  See All Users
                </Link>
              </SidebarMenuButton>

              <SidebarMenuItem>
                <Sheet>
                  <SidebarMenuButton asChild suppressHydrationWarning>
                    <SheetTrigger asChild>
                      <Link href="#">
                        <Plus />
                        Add User
                      </Link>
                    </SheetTrigger>
                  </SidebarMenuButton>
                  <AddUser />
                </Sheet>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>

        {/* Other */}
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild suppressHydrationWarning>
                      <Link href="#">
                        <MessageCircleQuestionMark />
                        FAQ
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild suppressHydrationWarning>
                      <Link href="#">
                        <Info />
                        Support
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild suppressHydrationWarning>
                <SidebarMenuButton>
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/98792546?v=4" />
                    <AvatarFallback className="font-bold bg-orange-600/10 text-orange-600">
                      J
                    </AvatarFallback>
                  </Avatar>
                  junnn6ix
                  <ChevronUp className="ml-auto " />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
                align="end">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
