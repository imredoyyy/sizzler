import Hero from "@/components/Hero";
import SpecialMenu from "@/components/SpecialMenu";
import Speciality from "@/components/Speciality";
import PopularDishes from "@/components/PopularDishes";
import ChooseUs from "@/components/ChooseUs";
import Chefs from "@/components/Chefs";

const Home = () => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Hero />
      <SpecialMenu />
      <Speciality />
      <PopularDishes />
      <Chefs />
      <ChooseUs />
    </main>
  );
};

export default Home;
