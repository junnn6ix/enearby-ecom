"use client";

import ShippingForm from "@/components/ShippingForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useCartStore from "../stores/CartStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import StripePaymentForm from "@/components/StripePaymentForm";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

const CartContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = parseInt(searchParams.get("step") || "1");
  const [shippingForm, setShippingForm] = useState<{
    fullname: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  }>();

  const { cart, removeFromCart } = useCartStore();

  return (
    <div className="flex flex-col gap-8 items-center justify-center my-8">
      <h1 className="text-xl font-bold">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-12">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-4 pb-3 border-b mb-4 ${
              step.id === activeStep ? "border-primary " : "border-secondary"
            }`}
            key={step.id}>
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full text-muted-foreground text-sm ${
                step.id === activeStep
                  ? "bg-primary text-secondary"
                  : "bg-secondary"
              }`}>
              {step.id}
            </div>
            <p
              className={`text-sm text-muted-foreground ${
                step.id === activeStep
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }`}>
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/*  */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/*  */}
        <div className="max-h-full w-full lg:w-7/12 bg-primary-foreground rounded-md flex flex-col gap-6 pb-6">
          {activeStep === 1 ? (
            <h2 className="text-md font-semibold pt-6 px-6">Cart Items</h2>
          ) : activeStep === 2 ? (
            <h2 className="text-md font-semibold pt-6 px-6">
              Shipping Information
            </h2>
          ) : activeStep === 3 ? (
            <h2 className="text-md font-semibold pt-6 px-6">Checkout</h2>
          ) : (
            ""
          )}
          <ScrollArea className="h-[60vh]">
            <div className="px-6 flex flex-col gap-6">
              {activeStep === 1 ? (
                cart.map((item) => (
                  // single item
                  <div
                    key={item.id + item.selectedSize + item.selectedColor}
                    className="flex items-center justify-between">
                    <div className="flex justify-between gap-6">
                      <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-secondary rounded-md overflow-hidden">
                        <Image
                          src={
                            (item.images as Record<string, string>)?.[
                              item.selectedColor
                            ] || ""
                          }
                          alt={item.name}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="flex flex-col justify-between gap-2 text-muted-foreground">
                        <p className="text-md font-semibold text-primary">
                          {item.name}
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs">
                            Size: {item.selectedSize.toUpperCase()}
                          </p>
                          <p className="text-xs">Color: {item.selectedColor}</p>
                          <p className="text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-primary text-md font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        removeFromCart(item);
                        toast.success("Product removed from cart");
                      }}
                      variant="destructive"
                      size="icon"
                      className="rounded-full">
                      <Trash />
                    </Button>
                  </div>
                ))
              ) : activeStep === 2 ? (
                <ShippingForm setShippingForm={setShippingForm} />
              ) : activeStep === 3 && shippingForm ? (
                <StripePaymentForm shippingForm={shippingForm} />
              ) : (
                <p className="text-sm text-destructive">
                  Please fill in the shipping form to continue.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
        {/*  */}
        <div className="w-full h-fit lg:w-5/12 bg-primary-foreground rounded-md p-6 flex flex-col gap-6">
          <h2 className="text-md font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 border-b pb-3 ">
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Subtotal</p>
                <p>
                  $
                  {cart
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Discount (10%)</p>
                <p className="text-destructive">-$10</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Shipping Fee</p>
                <p className=" ">$10</p>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-sm">
              <p className="">Total</p>
              <p>
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <Button
              onClick={() => router.push("/cart?step=2", { scroll: false })}>
              Continue
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartContent;
