import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative aspect-[3/1] mt-4">
      <Image src="/Banner.svg" alt="Featured" fill className="rounded-md" />
    </div>
  );
};

export default Banner;