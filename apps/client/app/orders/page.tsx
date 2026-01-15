import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

const fetchOrders = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: OrderType[] = await res.json();
  return data;
};

const OrderPage = async () => {
  const orders = await fetchOrders();

  if (!orders) {
    return <div>No orders right now. Create one</div>;
  }

  const sortedOrders = orders.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  console.log(sortedOrders);

  return (
    <div className="my-8 space-y-6 h-[65vh]">
      <h1 className="text-xl font-bold">Your Orders</h1>
      <ScrollArea className="h-[60vh] mb-6 rounded-md">
        <ul className="flex flex-col gap-4">
          {sortedOrders.map((order) => (
            <li
              key={order._id}
              className="p-4 bg-primary-foreground rounded-md grid grid-cols-12 gap-4 items-center h-24 overflow-hidden">
              <div className="col-span-3">
                <span className="text-muted-foreground font-medium text-sm block mb-1">
                  Order ID
                </span>
                <p className="truncate" title={order._id}>
                  {order._id}
                </p>
              </div>
              <div className="col-span-1">
                <span className="text-muted-foreground font-medium text-sm block mb-1">
                  Total
                </span>
                <p>${(order.amount / 100).toFixed(1)}</p>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground font-medium text-sm block mb-1">
                  Status
                </span>
                <p className="capitalize">{order.status}</p>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground font-medium text-sm block mb-1">
                  Date
                </span>
                <p className="text-sm">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("id-ID")
                    : "-"}
                </p>
              </div>
              <div className="col-span-3 overflow-hidden">
                <span className="text-muted-foreground font-medium text-sm block mb-1">
                  Products
                </span>
                <p
                  className="truncate text-sm"
                  title={
                    order.products?.map((product) => product.name).join(", ") ||
                    "-"
                  }>
                  {order.products?.map((product) => product.name).join(", ") ||
                    "-"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default OrderPage;
