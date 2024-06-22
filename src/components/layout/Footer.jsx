"use client";
import React from "react";
import Button from "../ui/Button";
import { Social_Links } from "@/data/data";
import Link from "next/link";
import { uniqueCategories } from "../PopularDishes";
import { ChevronRight, Phone, Mail, MapPin, Copyright } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-black-200 py-16 md:py-20">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <h2 className="text-2xl font-bold text-orange-50">Sizzler</h2>
                <p className="max-w-[320px] text-brown-100">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
              <ul className="flex items-center gap-1.5">
                {Social_Links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="nofollow noopener"
                      className="flex items-center justify-center rounded-full border border-white-100 p-2 transition-colors duration-300 hover:border-orange-100 hover:bg-orange-50 [&>svg]:size-5 [&>svg]:stroke-brown-100"
                    >
                      {link.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-2xl font-bold text-white-100">
                Hot Categories
              </h2>
              <ul className="flex flex-col gap-1.5">
                {uniqueCategories
                  .filter(
                    (category) => category !== "all" && category !== "fries",
                  )
                  .map((category, i) => (
                    <li key={i}>
                      <Link
                        href={`/search?q=${category}`}
                        className="group inline-flex items-center gap-0.5 font-medium capitalize text-brown-100 transition-all duration-400 hover:translate-x-2 hover:text-orange-50"
                      >
                        <ChevronRight className="size-5 stroke-brown-100 transition-all duration-400 group-hover:stroke-orange-50" />
                        {category}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-2xl font-bold text-white-100">Contact</h2>
              <ul className="flex flex-col gap-2">
                <li className="inline-flex items-center gap-2 text-white-50 transition-colors duration-300 hover:text-orange-50 hover:[&>svg]:stroke-orange-50">
                  <span>
                    <MapPin className="size-5 stroke-brown-50 transition-colors hover:stroke-orange-50" />
                  </span>
                  123, South Gate, MD
                </li>
                <li>
                  <Link
                    href="tel:+123456789"
                    className="inline-flex items-center gap-2 text-white-50 transition-colors duration-300 hover:text-orange-50 hover:[&>svg]:stroke-orange-50"
                  >
                    <span>
                      <Phone className="size-5 stroke-brown-50 transition-colors hover:stroke-orange-50" />
                    </span>
                    +123456789
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:contact@sizzler.com"
                    className="inline-flex items-center gap-2 text-white-50 transition-colors duration-300 hover:text-orange-50 hover:[&>svg]:stroke-orange-50"
                  >
                    <span>
                      <Mail className="size-5 stroke-brown-50" />
                    </span>
                    contact@sizzler.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-neutral-900 py-6">
        <p className="flex items-center justify-center gap-1 text-center text-sm font-medium text-white-100/70">
          <Copyright className="size-[18px]" /> {new Date().getFullYear()} |
          <Link
            href="https://github.com/imredoyyy"
            target="_blank"
            className="underline underline-offset-4 transition-colors duration-200 hover:text-white-100/85"
          >
            Coded
          </Link>{" "}
          with ❤️ by{" "}
          <Link
            href="https://coderredoy.com"
            target="_blank"
            className="underline underline-offset-4 transition-colors duration-200 hover:text-white-100/85"
          >
            Coder Redoy
          </Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
