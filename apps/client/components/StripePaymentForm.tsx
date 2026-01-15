"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItemsType, shippingFormInputs } from "@repo/types";
import CheckoutForm from "./CheckoutForm";
import useCartStore from "@/app/stores/CartStore";

const stripe = loadStripe(
  "pk_test_51SmaWzLLl1K4vy9wRRxBUzE2YGe8TjHrZxVdFkMnViLoH99Aop3HfhD3uC9jdtz98UL2osDQUJcNwam9aOyE9bRE00rmSktjbX"
);

const fetchClientSecret = async (
  cart: CartItemsType,
  token: string
): Promise<string> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
      {
        method: "POST",
        body: JSON.stringify({
          cart,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Payment service error: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();

    if (!json.checkoutSessionClientSecret) {
      console.error("Invalid response from payment service:", json);
      throw new Error("Payment service did not return a client secret");
    }

    return json.checkoutSessionClientSecret;
  } catch (error) {
    console.error("Failed to fetch client secret:", error);
    throw error; // Re-throw to let Stripe handle the error
  }
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: shippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  if (!token) {
    return <div className="">Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ fetchClientSecret: () => fetchClientSecret(cart, token) }}>
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
