"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Bell, ShoppingCart } from "lucide-react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import ShoppingCartIcon from "./ShoppingCartIcon";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between bg-background p-4 border-b-2 sticky top-0 z-50 ">
      <div className="flex items-center gap-6">
        <Logo />
        <div className="hidden md:hidden lg:flex items-center gap-4">
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <SearchBar />
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon">
            <Bell />
          </Button> */}
          <ShoppingCartIcon />
          <ModeToggle />
        </div>
        {/*  */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <ProfileButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
