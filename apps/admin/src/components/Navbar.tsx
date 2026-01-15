"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { setTheme } = useTheme();

  // const navMenu = [
  //   { title: "Home", href: "/" },
  //   { title: "Products", href: "/projects" },
  //   { title: "Payments", href: "/payments" },
  //   { title: "Stores", href: "/stores" },
  //   { title: "Users", href: "/users" },
  // ];

  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 bg-background z-10">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <Button variant="outline" size="icon" asChild suppressHydrationWarning>
          <SidebarTrigger />
        </Button>

        {/* CENTER
        <div className="flex items-center gap-4">
          {navMenu.map((item) => (
            <Link key={item.title} href={item.href} className="mx-4">
              {item.title}
            </Link>
          ))}
        </div> */}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <Link href="/">Dashboard</Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
