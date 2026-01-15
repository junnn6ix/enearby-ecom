import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import ProductList from "@/components/ProductList";
import { CategoryType } from "@repo/types";
import { Suspense } from "react";

const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch categories");
      return [];
    }

    const data: CategoryType[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const categoryParam = (await searchParams).category;
  const categories = await fetchCategories();

  // Don't pass category if it's "all" - show all products instead
  const category = categoryParam === "all" ? undefined : categoryParam;

  return (
    <div className="w-full space-y-8">
      <Banner />
      <Suspense fallback={<div className="w-full h-12" />}>
        <Categories categories={categories} />
      </Suspense>
      <ProductList title="Categories" category={category} params="" />
    </div>
  );
};

export default Page;
