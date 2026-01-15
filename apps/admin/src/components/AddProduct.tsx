"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import {
  CategoryType,
  colors,
  productFormSchema,
  ProductFormType,
  sizes,
} from "@repo/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const fetchCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await res.json();
};

const AddProduct = () => {
  const form = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      categorySlug: "",
      sizes: [],
      colors: [],
      images: {},
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const router = useRouter();
  const { getToken } = useAuth();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof productFormSchema>) => {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create product!");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success("Successfully created product");
      form.reset();
      router.refresh();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: ProductFormType) => {};

  return (
    <SheetContent>
      <ScrollArea className="h-screen ">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="grid flex-1 auto-rows-min gap-6 px-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {data && (
              <FormField
                control={form.control}
                name="categorySlug"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {data.map((cat: CategoryType) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4 my-2">
                      {sizes.map((size) => (
                        <div key={size} className="flex items-center gap-3">
                          <Checkbox
                            id={size}
                            checked={field.value?.includes(size)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              if (checked) {
                                field.onChange([...currentValues, size]);
                              } else {
                                field.onChange(
                                  currentValues.filter((v) => v !== size)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={size}>{size.toUpperCase()}</Label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 my-2">
                        {colors.map((color) => (
                          <div
                            key={color}
                            className={`flex items-center gap-3 `}>
                            <Checkbox
                              id={color}
                              checked={field.value?.includes(color)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValues, color]);
                                } else {
                                  field.onChange(
                                    currentValues.filter((v) => v !== color)
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={color}>
                              <span
                                className="h-2.5 w-2.5 rounded-md"
                                style={{ backgroundColor: color }}></span>
                              {color}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {/* {field.value && field.value.length > 0 && (
                        <div className="space-y-4 mt-8">
                          <p className="text-sm">
                            Upload images for selected colors
                          </p>
                          {field.value.map((color) => (
                            <div
                              className="flex items-center gap-2"
                              key={color}>
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                              <span className="text-sm min-w-[60px]">
                                {color}
                              </span>
                              <Input type="file" accept="image/*" />
                            </div>
                          ))}
                        </div>
                      )} */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div>
                      {form.watch("colors")?.map((color) => (
                        <div
                          className="mb-4 flex items-center gap-4"
                          key={color}>
                          <div className="flex items-center gap-2">
                            <div
                              className=" w-4 h-4 rounded-sm "
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-sm font-medium min-w-[60px]">
                              {color}:
                            </span>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  // Upload image
                                  const formData = new FormData();
                                  formData.append("file", file);
                                  formData.append("upload_preset", "enearby");

                                  const res = await fetch(
                                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                                    {
                                      method: "POST",
                                      body: formData,
                                    }
                                  );

                                  const data = await res.json();

                                  if (data.secure_url) {
                                    const curentImages =
                                      form.getValues("images") || {};
                                    form.setValue("images", {
                                      ...curentImages,
                                      [color]: data.secure_url,
                                    });
                                  }
                                } catch (error) {
                                  console.log(error);
                                  toast.error("Failed to upload image");
                                }
                              }
                            }}
                          />
                          {field.value?.[color] ? (
                            <span className="text-xs text-primary ">
                              Image selected
                            </span>
                          ) : (
                            <span className="text-xs text-destructive ">
                              Image required
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mb-12"
              type="submit"
              disabled={mutation.isPending}
              variant={mutation.isPending ? "ghost" : "default"}>
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;
