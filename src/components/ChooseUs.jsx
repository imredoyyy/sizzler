import React from "react";
import Container from "./layout/Container";
import { Choose_Us_Data } from "@/data/data";
import Counter from "@/lib/Counter";
import Button from "./ui/Button";
import Link from "next/link";
import SectionHeader from "./layout/SectionHeader";

const ChooseUs = () => {
  return (
    <Container className="relative flex min-h-[40rem] items-center overflow-x-hidden bg-parallax-bg bg-cover bg-fixed bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black-50/20"></div>

      {/* Content */}
      <div className="flex h-full flex-col gap-12">
        <SectionHeader
          subtitle="Why Choose Us?"
          title="We offer a unique blend of exceptional flavors"
          titleClass="text-white-100"
          description="From locally sourced ingredients to expertly crafted dishes, every
            detail is designed to create an unforgettable dining experience.
            Join us to savor the difference!"
          descClass="text-white-50"
        />

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-4">
            {Choose_Us_Data.map((data, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Counter
                  className="text-center text-3xl font-bold text-orange-50 md:text-5xl"
                  target={data.count}
                  duration={1000}
                  suffix={i === Choose_Us_Data.length - 1 ? "k+" : "+"}
                />
                <h4 className="text-center font-bold text-white-100 sm:text-xl lg:text-2xl">
                  {data.title}
                </h4>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href={"/menu"}>
              <Button radius="sm" size="lg">
                View Our Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChooseUs;
