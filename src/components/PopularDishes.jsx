"use client";
import React, { useState } from "react";

import Container from "./layout/Container";
import { products } from "@/data/products";
import Button from "./ui/Button";
import { mergeClasses } from "@/lib/utils";
import ProductCard from "./ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./layout/SectionHeader";

export const uniqueCategories = products.reduce(
  (uniqueCategory, product) => {
    if (!uniqueCategory.includes(product.category)) {
      uniqueCategory.push(product.category);
    }
    return uniqueCategory;
  },
  ["all"],
);
const PopularDishes = () => {
  const [selectedCategory, setSelectedCategory] = useState("pizza");

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory,
  );

  return (
    <Container>
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-8">
          <SectionHeader
            subtitle="Fresh From Sizzler"
            title="Our Popular Dishes"
            description="Discover the mouthwatering favorites fresh from Sizzler's
              kitchen. From sizzling steaks to ocean-inspired delights, we have
              everything you need."
          />

          <div className="flex flex-wrap items-center justify-center gap-4">
            {uniqueCategories
              .filter((category) => category !== "all")
              .map((category, i) => (
                <Button
                  size="md"
                  radius="sm"
                  key={i}
                  className={mergeClasses(
                    "border capitalize duration-400 hover:border-orange-100 hover:bg-orange-50 hover:text-white-50",
                    selectedCategory === category
                      ? "border-orange-100"
                      : "border-slate-800 bg-transparent text-orange-50",
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
          </div>
        </div>

        <div className="grid w-full place-items-center gap-6 sm:grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.35 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
};

export default PopularDishes;
