"use client";

import { ShoppingBasket } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryType } from "@repo/types";
import { Button } from "./ui/button";

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") || "all";
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Add "All" category at the beginning
  const allCategories = [{ id: 0, name: "All", slug: "all" }, ...categories];

  return (
    <div className="w-full mb-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {allCategories.map((category) => {
          const isSelected = category.slug === selectedCategory;
          return (
            <Button
              key={category.slug}
              onClick={() => handleChange(category.slug)}
              variant={isSelected ? "default" : "secondary"}
              size="lg"
              className="rounded-full">
              {category.slug === "all" && (
                <ShoppingBasket className="w-4 h-4" />
              )}
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
