import React from "react";
import Container from "./layout/Container";
import SectionHeader from "./layout/SectionHeader";
import { ChefData } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

const Chefs = () => {
  return (
    <Container>
      <SectionHeader subtitle="We Have The Best Chefs" title="Meet Our Chefs" />

      <div className="grid grid-cols-1 place-items-center gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {ChefData.map((chef, i) => (
          <div
            key={i}
            className="flex w-[240px] flex-col overflow-hidden rounded-2xl bg-zinc-100 shadow-2xl lg:w-[260px]"
          >
            <div className="flex justify-center">
              <Image
                src={chef.image}
                width="auto"
                height="auto"
                className="h-[230px] w-full object-cover object-center"
                alt={chef.name}
              />
            </div>
            <div className="flex flex-col gap-2 py-6">
              <h3 className="text-center text-2xl font-bold">{chef.name}</h3>
              <p className="text-center font-semibold text-orange-50">
                {chef.position}
              </p>
              <ul className="flex items-center justify-center gap-3">
                {chef.socialLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="nofollow noopener"
                    className="flex items-center justify-center rounded-full border bg-orange-50 p-2.5 transition-colors duration-300 active:bg-orange-100 md:hover:bg-orange-100 [&>svg]:size-[22px] [&>svg]:stroke-white-100"
                  >
                    {link.icon}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Chefs;
