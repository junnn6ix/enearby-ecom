"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  cardholder: z
    .string()
    .min(2, "Cardholder name must be at least 2 characters long"),
  cardnumber: z
    .string()
    .min(16, "Card is required!")
    .max(16, "Card is required"),
  exp: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

const PaymentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardholder: "",
      cardnumber: "",
      exp: "",
      cvv: "",
    },
  });

  const router = useRouter();

  function handlePaymentForm(data: z.infer<typeof formSchema>) {}

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePaymentForm)}
          className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="cardholder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-4 items-center justify-between">
            <FormField
              control={form.control}
              name="cardnumber"
              render={({ field }) => (
                <FormItem className="w-9/12">
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem className="w-3/12">
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="exp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiration Date</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type="submit" className="mt-4">
            Checkout
            <ShoppingCart />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;
