"use client";

import { ProductType } from "@repo/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";
import { useState } from "react";
import useCartStore from "@/app/stores/CartStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { CreditCard, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const [productTypes, setProductTypes] = useState({
    size: selectedSize,
    color: selectedColor,
  });

  const { addToCart } = useCartStore();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const handleTypeChange = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart");
  };
  return (
    <div className="flex flex-col justify-between gap-12">
      {/* sizes and colors */}
      <div className="flex flex-col gap-2 text-sm">
        <p>Variants</p>
        <div className="flex items-center gap-6">
          {/* sizes */}
          <Select
            defaultValue={selectedSize}
            onValueChange={(e) =>
              handleTypeChange({
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
          <RadioGroup defaultValue={productTypes.color}>
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
                    handleTypeChange({ type: "color", value: color })
                  }
                />
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* qty */}
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-medium">Quantity</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange("decrement")}>
            <Minus />
          </Button>
          <span className="h-9 w-9 bg-secondary rounded-md border flex items-center justify-center">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange("increment")}>
            <Plus />
          </Button>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
        <Button
          variant="secondary"
          size="lg"
          className="w-full lg:w-1/2"
          onClick={handleAddToCart}>
          <ShoppingCart />
          Add To Cart
        </Button>
        <Button size="lg" className="w-full lg:w-1/2">
          <CreditCard />
          Buy Now
        </Button>
      </div>
      {/*  */}
      <div className="flex flex-col gap-4 border-t pt-2">
        <div className="flex items-center gap-2 mt-2">
          <Image
            src="/cards.png"
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/klarna.png"
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/stripe.png"
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>
        <p className="text-muted-foreground text-xs">
          By clicking Buy Now, you agree to our{" "}
          <span className="underline hover:text-primary">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="underline hover:text-primary">Privacy Policy</span>.
          You authorize us to charge your selected payment method for the total
          amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-primary">Refund Policies</span>
        </p>
      </div>
    </div>
  );
};

export default ProductInteraction;
