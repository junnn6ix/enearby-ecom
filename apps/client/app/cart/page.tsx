import CartContent from "@/components/CartContent";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading cart...
        </div>
      }>
      <CartContent />
    </Suspense>
  );
};

export default Page;
