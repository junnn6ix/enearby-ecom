import { Copyright } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-primary-foreground p-4 md:p-6 rounded-md text-primary flex flex-row flex-wrap justify-between gap-6">
      <div className="w-full md:w-1/4 border-b md:border-0 pb-4 flex flex-col justify-between gap-8 md:gap-10 lg:gap-12">
        <div className="flex items-center gap-2">
          <Logo />
          <p className="block md:hidden text-lg font-bold">eNearby</p>
        </div>
        <p className="text-base">All you need in nearby</p>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Copyright className="w-4 h-4" />
          2025 eNearby ecomms.
        </p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-muted-foreground ">
        <p className="text-sm text-primary font-bold">Links</p>
        <Link href="/">Homepage</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-muted-foreground ">
        <p className="text-sm text-primary font-bold">Links</p>
        <Link href="/">All Products</Link>
        <Link href="/">New Arrivals</Link>
        <Link href="/">Best Sellers</Link>
        <Link href="/">Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-muted-foreground ">
        <p className="text-sm text-primary font-bold">Links</p>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Blog</Link>
        <Link href="/">Affiliate Program</Link>
      </div>
    </footer>
  );
};

export default Footer;
