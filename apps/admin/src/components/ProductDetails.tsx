"use client";

import { useState } from "react";
import { ProductType, CategoryType } from "@repo/types";
import { Badge } from "./ui/badge";
import { Edit2, Package } from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

type ProductWithCategory = ProductType & {
  category: CategoryType;
};

const ProductDetails = ({ data }: { data: ProductWithCategory }) => {
  const [selectedColor, setSelectedColor] = useState(data.colors[0] || "");

  return (
    <div className="mt-4 flex flex-col xl:flex-row gap-6">
      {/* LEFT - Product Image */}
      <div className="w-full xl:w-2/6 bg-primary-foreground rounded-lg p-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold">Product Image</h1>
        {/* Main Product Image */}
        <div className="relative w-full aspect-2/3 rounded-lg overflow-hidden bg-muted mb-4">
          {selectedColor &&
          (data.images as Record<string, string>)[selectedColor] ? (
            <Image
              src={(data.images as Record<string, string>)[selectedColor] || ""}
              alt={`${data.name} - ${selectedColor}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT - Product Details */}
      <div className="w-full xl:w-4/6 bg-primary-foreground rounded-lg p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Product Information</h1>
            <Button variant="ghost" size="icon">
              <Edit2 size={16} />
            </Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-muted-foreground mt-1">
              {data.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold">Category:</span>
            <Badge variant="outline" className="text-sm py-1 px-3">
              {data.category.name}
            </Badge>
          </div>
          <span className="text-2xl font-bold text-primary">
            ${data.price.toFixed(1)}
          </span>
          <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
            <div className="flex flex-wrap gap-3">
              {data.colors.map((color) => (
                <div
                  key={color}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors cursor-pointer ${
                    selectedColor === color ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}>
                  <RadioGroupItem
                    value={color}
                    id={color}
                    className="w-4 h-4 "
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm capitalize">{color}</span>
                </div>
              ))}
            </div>
          </RadioGroup>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.sizes.map((size) => (
              <Badge
                key={size}
                variant="outline"
                className="h-10 w-10 rounded-md">
                {size.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t flex flex-col gap-4">
          <div>
            <span className="font-bold block mb-2">Description:</span>
            <p className="text-muted-foreground">{data.description}</p>
          </div>

          <div className="pt-4 border-t text-sm text-muted-foreground">
            <p>
              Created:{" "}
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              Last Updated:{" "}
              {new Date(data.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
