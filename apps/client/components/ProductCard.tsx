"use client";

import { ProductType } from "@repo/types";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import useCartStore from "@/app/stores/CartStore";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0] || "",
    color: product.colors[0] || "",
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedColor: productTypes.color,
      selectedSize: productTypes.size,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="border rounded-lg overflow-hidden ">
      {/* product image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-2/3 bg-primary-foreground">
          <Image
            src={
              (product.images as Record<string, string>)?.[
                productTypes.color
              ] || ""
            }
            alt={product.name}
            className="object-cover hover:scale-105 transition-all duration-300"
            fill
          />
        </div>
      </Link>

      {/* product details */}
      <div className="flex flex-col gap-4 p-4">
        <Link
          href={`/products/${product.id}`}
          className="font-semibold text-md">
          {product.name}
        </Link>
        <p className="text-muted-foreground text-sm">
          {product.shortDescription}
        </p>

        {/* product variants */}
        <div className="space-y-4">
          <p className="text-sm">Variants</p>
          <div className="flex items-center gap-4 text-xs">
            {/* sizes */}
            <Select
              onValueChange={(e) =>
                handleProductType({
                  type: "size",
                  value: e,
                })
              }>
              <SelectTrigger className="w-20">
                <SelectValue placeholder={"Size"} />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size: string) => (
                  <SelectItem key={product.id + size} value={size} className="">
                    {size.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* colors */}
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                {product.colors.map((color: string) => (
                  <RadioGroupItem
                    key={product.id + color}
                    value={color}
                    id={color}
                    style={{ backgroundColor: color }}
                    className={`cursor-pointer ${
                      productTypes.color === color ? "border" : "border-none"
                    }`}
                    onClick={() =>
                      handleProductType({ type: "color", value: color })
                    }
                  />
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* price */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-lg">${product.price.toFixed(1)}</p>
          <Button onClick={handleAddToCart}>
            <ShoppingCart />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
