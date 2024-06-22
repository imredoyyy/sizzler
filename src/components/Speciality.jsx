import React from "react";
import Container from "./layout/Container";
import Image from "next/image";
import Link from "next/link";
import { SizzlerSpeciality } from "@/data/data";
import Button from "./ui/Button";
import ChefImage from "/public/images/chef-image.jpg";
import SectionHeader from "./layout/SectionHeader";

const Speciality = () => {
  return (
    <Container>
      <div className="grid place-items-center gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeader
            subtitle="Eat & Enjoy"
            subtitleClass="md:text-left"
            title="Finger Licking Fresh And Juicy Flavors"
            titleClass="md:text-left"
            description="Etiam quis lobortis odio, at sodales mauris. Morbi fermentum
              pretium ligula, id efficitur quam mattis in. Fusce nec pretium
              ante."
            descClass="md:text-left"
          />
          <ul className="grid grid-cols-2 items-center gap-2">
            {SizzlerSpeciality.map((data, i) => (
              <li key={i} className="flex items-center gap-3">
                <div>
                  <Image
                    src={data.icon}
                    alt={data.title}
                    width={32}
                    height={32}
                  />
                </div>
                <h4 className="font-semibold">{data.title}</h4>
              </li>
            ))}
          </ul>

          <Link href={"/menu"}>
            <Button radius="sm" size="md">
              View Menu
            </Button>
          </Link>
        </div>

        <div className="p-6">
          <div className="flex justify-center">
            <Image
              src={ChefImage}
              alt="chef"
              width={535}
              height={650}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Speciality;
