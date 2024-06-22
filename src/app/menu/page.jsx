"use client";
import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { mergeClasses } from "@/lib/utils";
("@/components/ui/Breadcrumbs");
import { uniqueCategories } from "@/components/PopularDishes";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    document.title = "Menu | Sizzler";
  });

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  return (
    <>
      <Breadcrumbs page="Menu" pageName="Menu" />

      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {uniqueCategories.map((category, i) => (
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
    </>
  );
};

export default MenuPage;
