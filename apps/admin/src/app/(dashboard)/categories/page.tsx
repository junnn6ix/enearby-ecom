import { CategoryType } from "@repo/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@clerk/nextjs/server";

const getData = async (): Promise<CategoryType[]> => {
  const { getToken } = await auth();
  const token = await getToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const CategoriesPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 rounded-md bg-secondary">
        <h1 className="text-xl font-bold">All Categories</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CategoriesPage;
