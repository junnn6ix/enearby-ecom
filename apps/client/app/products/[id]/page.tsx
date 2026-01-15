import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@repo/types";
import Image from "next/image";

export const dynamic = "force-dynamic";

// Dummy
// const product: ProductType = {
//   id: 1,
//   name: "Adidas CoreFit T-Shirt",
//   shortDescription:
//     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//   description:
//     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//   price: 39.9,
//   sizes: ["s", "m", "l", "xl", "xxl"],
//   colors: ["gray", "purple", "green"],
//   images: {
//     gray: "/products/1g.png",
//     purple: "/products/1p.png",
//     green: "/products/1gr.png",
//   },
//   categorySlug: "tes",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

const fetchProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`
  );
  const data: ProductType = await res.json();
  return data;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // TODO

  const { id } = await params;
  const product = await fetchProduct(id);

  return {
    title: product.name,
    description: product.shortDescription,
  };
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const { id } = await params;
  const product = await fetchProduct(id);

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-10 my-12 ">
      {/* Image */}
      <div className="w-full lg:w-5/12 rounded-md overflow-hidden relative aspect-2/3 bg-primary-foreground">
        <Image
          src={(product.images as Record<string, string>)[selectedColor] || ""}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Details */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4 bg-primary-foreground rounded-md p-6 justify-between ">
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-2xl">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  );
};

export default Page;
