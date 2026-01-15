import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined;
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) return <div>No session id found</div>;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`
  );
  const data = await res.json();
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center bg-primary-foreground my-6 rounded-md gap-8">
      <CheckCircle size={32} />
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">Payment {data.status}</h1>
        <p className="text-md mb-4">Payment status: {data.paymentStatus}</p>

        <Button>
          <Link href="/orders">See your orders</Link>
        </Button>
      </div>
    </div>
  );
};

export default ReturnPage;
