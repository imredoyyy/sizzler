"use client";
import { useRef } from "react";

import Container from "../layout/Container";
import { mergeClasses } from "@/lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Button from "./Button";
import ProductCard from "./ProductCard";

const Slider = ({ filteredProducts, sliderTitle }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += 200;
  };

  return (
    <Container>
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold md:text-4xl">{sliderTitle}</h1>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              isIconOnly
              aria-label="Slide Left"
              className={mergeClasses("h-10 w-10 rounded-full")}
              onClick={scrollLeft}
            >
              <ArrowLeft />
            </Button>
            <Button
              size="sm"
              isIconOnly
              aria-label="Slide Right"
              className={mergeClasses("h-10 w-10 rounded-full")}
              onClick={scrollRight}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div
          className="flex items-center gap-8 overflow-x-scroll whitespace-nowrap transition-all duration-300"
          id="slider"
          ref={sliderRef}
        >
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Slider;
