"use client";

import useCartStore from "../app/stores/CartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;
  return (
    <Link href="/cart" className="relative px-2">
      <ShoppingCart className="w-4 h-4" />
      <Badge
        variant="secondary"
        className="absolute -top-4 -right-1 h-5 w-5 text-xs">
        {cart.reduce((acc: number, item: any) => acc + item.quantity, 0)}
      </Badge>
    </Link>
  );
};

export default ShoppingCartIcon;
