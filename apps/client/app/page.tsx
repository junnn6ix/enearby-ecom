import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <main className="">
      <Banner />
      <ProductList title="Featured Products" category="" params="homepage" />
    </main>
  );
};

export default Page;
