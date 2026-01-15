"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

const UnauthorizedPage = () => {
  const { signOut } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen">
      <h1 className=" font-bold text-2xl ">You do not have access!</h1>
      <Button variant="destructive" size="lg" onClick={() => signOut()}>
        <LogOut />
        Sign Out
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
