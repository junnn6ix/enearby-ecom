import type { Product, Category } from "@repo/product-db";
import { z } from "zod";

export type ProductType = Product;
export type ProductsType = ProductType[];

export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};

export type CategoryType = Category;

// export const categories = [
//   "T-Shirts",
//   "Shoes",
//   "Accessories",
//   "Bags",
//   "Dresses",
//   "Jackets",
//   "Gloves",
// ] as const;

export const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

export const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

export const productFormSchema = z
  .object({
    name: z.string().min(1, "Product's Name is required"),
    shortDescription: z
      .string()
      .min(10, "Product short description is required")
      .max(60, "Product short description maximum is 60 characters"),
    description: z
      .string()
      .min(60, "Product description must be at least 60 characters"),
    price: z.coerce
      .number()
      .positive("Product price is required and must be greater than 0"),
    categorySlug: z.string({ message: "category is required" }),
    sizes: z.array(z.enum(sizes)).min(1, "Product must have at least one size"),
    colors: z
      .array(z.enum(colors))
      .min(1, "Product must have at least one color"),
    images: z.record(
      z.string(),
      z.string({ message: "Image for each colors is required!" })
    ),
  })
  .refine(
    (data) => {
      const missingImages = data.colors.filter(
        (color: string) => !data.images?.[color]
      );
      return missingImages.length === 0;
    },
    {
      message: "Image is required for each selected color",
      path: ["images"],
    }
  );

export type ProductFormType = z.infer<typeof productFormSchema>;

export const categoryFormSchema = z.object({
  name: z.string().min(3, "Category Name is required"),
  slug: z.string().min(3, "Category Slug is required"),
});

export type CategoryFormType = z.infer<typeof categoryFormSchema>;
