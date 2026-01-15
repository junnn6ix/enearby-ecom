import CardList from "@/components/CardList";
import { ChartAreaGradient } from "@/components/ChartArea";
import { ChartBarMultiple } from "@/components/ChartBarMultiple";
import { ChartPieDonutText } from "@/components/ChartPie";
import ToDoList from "@/components/ToDoList";
import { auth } from "@clerk/nextjs/server";

const Home = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const orderChartData = fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <ChartBarMultiple title="Total Order" dataPromise={orderChartData} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <ChartPieDonutText title="Viewers" />
      </div>
      <div className="bg-primary-foreground py-6 px-4 rounded-lg">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary-foreground py-6 px-4 rounded-lg ">
        <CardList title="Popular Products" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <ChartAreaGradient title="Transactions" />
      </div>
      <div className="bg-primary-foreground py-6 px-4 rounded-lg">
        <ToDoList />
      </div>
    </main>
  );
};

export default Home;
