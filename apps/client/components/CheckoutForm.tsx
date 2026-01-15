"use client";

import { shippingFormInputs } from "@repo/types";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { ConfirmError } from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "./ui/button";
import { CreditCard } from "lucide-react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: shippingFormInputs;
}) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async () => {
    setLoading(true);
    await checkout.updateEmail(shippingForm.email);
    await checkout.updateShippingAddress({
      name: shippingForm.fullname,
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "US",
      },
    });
    const res = await checkout.confirm();
    if (res.type === "error") {
      setError(res.error);
    }

    setLoading(false);
  };

  return (
    <form action="" className="space-y-4">
      <PaymentElement options={{ layout: "accordion" }} />
      <Button
        disabled={loading}
        onClick={handleClick}
        className="w-full"
        size="lg">
        <CreditCard />
        {loading ? "Processing..." : "Pay"}
      </Button>
      {error && <p className="text-destructive">{error.message}</p>}
    </form>
  );
};

export default CheckoutForm;
