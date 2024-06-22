"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/layout/Container";
import { Search } from "lucide-react";
import { uniqueCategories } from "@/components/PopularDishes";
import ProductCard from "@/components/ui/ProductCard";
import NoProduct from "/public/no-product.png";
import { motion, AnimatePresence } from "framer-motion";

const SearchPage = () => {
  const router = useRouter();

  // Get search query from URL
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [search, setSearch] = useState(searchQuery || "");

  // Set page title based on search query
  useEffect(() => {
    if (searchQuery) {
      document.title = `Search Results for "${searchQuery}" | Sizzler`;
    } else {
      document.title = "Search | Sizzler";
    }
  }, [searchQuery]);

  // Filter products based on search query
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase().split(" ");

      const exactMatches = [];
      const partialMatches = [];

      products.forEach((product) => {
        const productName = product.name.toLowerCase();
        const productCategory = product.category.toLowerCase();

        if (productName === searchQuery) {
          exactMatches.push(product);
        } else if (
          query.some(
            (word) =>
              productName.includes(word) || productCategory.includes(word),
          )
        ) {
          partialMatches.push(product);
        }
      });

      setFilteredProducts([...exactMatches, ...partialMatches]);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search) {
      const formattedQuery = search.trim().replace(/\s+/g, "+");

      router.push(`/search?q=${formattedQuery.toLowerCase()}`, {
        scroll: false,
      });
    }
  };

  const handleLinkClick = (category) => {
    setSearch(category);
    router.push(`/search?q=${category}`);
  };

  // Count products in each category
  const categoryCounts = products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});

  return (
    <>
      <Breadcrumbs
        pageName={searchQuery ? `Search Results for ${searchQuery}` : "Search"}
      />
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-between">
            <form
              onSubmit={handleSearch}
              className="flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 p-2.5"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-black-100 placeholder:text-black-100 min-w-[180px] bg-transparent p-2 text-sm outline-none"
                placeholder="Search..."
              />
              <button className="grid place-items-center rounded-md bg-orange-50 p-2 transition-colors duration-200 active:bg-orange-100 md:hover:bg-orange-100">
                <Search className="stroke-white-100 size-5" />
              </button>
            </form>
            {filteredProducts.length > 0 && (
              <div className="text-lg font-bold">
                Showing all {filteredProducts.length} results
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-10 md:flex-row">
            <div className="flex flex-col gap-6 md:min-w-[170px] lg:min-w-52">
              <h1 className="font-barlow text-black-50 text-xl font-bold md:text-2xl">
                Categories
              </h1>
              <div className="h-px bg-slate-400"></div>
              <div className="flex flex-col">
                {uniqueCategories
                  .filter((category) => category !== "all")
                  .map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between border-b border-slate-400 py-3 first:pt-0 last:border-none"
                    >
                      <button
                        onClick={() => handleLinkClick(category)}
                        className="text-black-100 font-medium capitalize transition-colors duration-200 active:text-orange-50 md:hover:text-orange-50"
                      >
                        {category}
                      </button>
                      <span className="text-black-100">
                        {" "}
                        ({categoryCounts[category] || 0})
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Right */}
            {filteredProducts.length > 0 ? (
              <div className="flex w-full flex-wrap justify-center gap-6">
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
                      <ProductCard key={product.id} product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col gap-6">
                <div className="flex items-center justify-center">
                  <Image
                    src={NoProduct}
                    width={380}
                    height={330}
                    alt="No Products"
                  />
                </div>
                <h1 className="text-center text-2xl font-bold md:text-3xl">
                  No results found!
                </h1>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

const SearchPageWithSuspense = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen w-full items-center justify-center">
        Loading...
      </div>
    }
  >
    <SearchPage />
  </Suspense>
);

export default SearchPageWithSuspense;
