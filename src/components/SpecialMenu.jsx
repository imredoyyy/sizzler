import Container from "./layout/Container";
import SectionHeader from "./layout/SectionHeader";
import { products } from "@/data/products";
import HorizontalProductCard from "./ui/HorizontalProductCard";

const SpecialMenu = () => {
  const specialMenu = products.filter(
    (product) => product.specialMenu === true,
  );

  return (
    <Container>
      <SectionHeader subtitle="Special Menu" title="Today's Special Menu" />

      <div className="grid grid-cols-1 place-items-center gap-x-6 gap-y-10 md:grid-cols-2 lg:gap-12">
        {specialMenu.map((product) => (
          <HorizontalProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default SpecialMenu;
