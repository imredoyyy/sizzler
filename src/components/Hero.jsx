import Link from "next/link";
import Image from "next/image";
import { mergeClasses } from "@/lib/utils";
import Container from "./layout/Container";
import Button from "./ui/Button";
import { ShoppingCart, Check } from "lucide-react";
import PizzaLg from "@/assets/pizza-lg.png";
import Tomato from "@/assets/tomato.png";
import Lettuce from "@/assets/lettuce.png";

const Hero = () => {
  return (
    <Container className={"overflow-x-hidden bg-brown-100"}>
      <div className="grid grid-cols-1 place-items-center gap-12 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col items-center gap-y-6 md:items-start">
          <h1 className="text-center font-barlow text-4xl font-bold uppercase !leading-tight md:text-start md:text-5xl lg:text-6xl xl:text-7xl">
            The <span className="text-orange-50">Best Pizza</span> <br /> in The
            Town!
          </h1>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 font-semibold">
              <span className="grid aspect-square place-items-center rounded-full bg-orange-50 p-0.5 [&_svg]:size-[16px] [&_svg]:stroke-white-100">
                <Check />
              </span>{" "}
              Free Delivery
            </li>
            <li className="flex items-center gap-2 font-semibold">
              <span className="grid aspect-square place-items-center rounded-full bg-orange-50 p-0.5 [&_svg]:size-[16px] [&_svg]:stroke-white-100">
                <Check />
              </span>{" "}
              Best Quality
            </li>
            <li className="flex items-center gap-2 font-semibold">
              <span className="grid aspect-square place-items-center rounded-full bg-orange-50 p-0.5 [&_svg]:size-[16px] [&_svg]:stroke-white-100">
                <Check />
              </span>
              Fresh Ingredients
            </li>
          </ul>
          <Link href={`/search?q=pizza`}>
            <Button size="lg" radius="sm" endContent={<ShoppingCart />}>
              Order Now
            </Button>
          </Link>
        </div>
        <div className="relative flex justify-center">
          <Image
            src={PizzaLg}
            alt="Pizza"
            className="z-10 mr-14 max-w-[350px] object-cover md:max-w-full"
          />
          <Image
            src={Tomato}
            width={200}
            height={200}
            alt="Tomato"
            className="absolute -right-5 -top-4 md:-right-6 md:-top-5 lg:-right-4 lg:-top-3 xl:-right-0"
          />
          <Image
            src={Lettuce}
            alt="Lettuce"
            className="absolute -bottom-4 left-0 md:-bottom-2 md:-left-3 xl:left-10"
          />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
