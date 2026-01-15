import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";

const Page = async () => {
  return (
    <main className="">
      <Banner />
      <ProductList title="Featured Products" category="" params="homepage" />
    </main>
  );
};

export default Page;
