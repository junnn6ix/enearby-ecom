import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo-light.svg"
        alt="eNearby Logo"
        width={24}
        height={24}
        className="block transition-all dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        alt="eNearby Logo"
        width={24}
        height={24}
        className="hidden transition-all dark:block"
      />
      <h1 className="text-xl md:text-2xl font-bold hidden md:block">eNearby</h1>
    </Link>
  );
};

export default Logo;
