"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center mt-[25vh]">
      <SignIn />
    </div>
  );
}
