"use client";
import { useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { products } from "@/data/products";
import { formatCurrency, mergeClasses } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";
import { Plus, Minus } from "lucide-react";
import { CartContext } from "@/provider/AppContext";
import toast from "react-hot-toast";
import Link from "next/link";

const ProductPage = () => {
  const params = useParams();
  const { productCategory, productId } = params;
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    document.title = `${product.name} | Sizzler`;
  });

  // Find the product by id and category
  const product = products.find(
    (product) =>
      product.id === productId && product.category === productCategory,
  );

  // Find all products in the same category
  const relatedProducts = products.filter(
    (product) =>
      product.category === productCategory && product.id !== productId,
  );

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleExtraChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setExtras([...extras, name]);
    } else {
      setExtras(extras.filter((extra) => extra !== name));
    }
  };

  //Increment quantity
  const incrementQuantity = () => {
    setQuantity((q) => q + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  useEffect(() => {
    // setSelectedSize to 'Medium' if sizes are available
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      // Reset selectedSize if sizes are not available
      setSelectedSize(null);
    }
  }, [product.sizes]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, extras);
    toast.success("Added to the cart!");
  };

  return (
    <>
      <Breadcrumbs
        page="Product"
        productCategory={product.category}
        pageName={product.name}
      />
      <Container>
        <div className="productPage-grid">
          <div className="grid h-fit place-items-center rounded-xl bg-slate-300 p-4 md:p-8">
            <Image
              src={product.image}
              className="md:full w-[300px] object-cover"
              alt={product.name}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-5 border-slate-400 md:items-start">
              <h1 className="text-center text-3xl font-bold -tracking-[0.03em] md:text-left md:text-4xl">
                {product.name}
              </h1>
              <h3 className="text-2xl font-bold text-orange-50 md:text-3xl">
                ${formatCurrency(product.priceCents)}
              </h3>
              <div className="whitespace-nowrap text-black-100">
                Category:{" "}
                <Link
                  href={`/search?q=${product.category}`}
                  className="font-semibold capitalize text-orange-50 transition-colors duration-300 active:text-orange-100"
                >
                  {product.category}
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-black-100">{product.description}</p>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2">
                  {/* Sizes */}
                  {product.sizes && (
                    <div className="flex flex-col gap-3 ">
                      <p className="text-black-100">Select Size:</p>
                      <div className="flex flex-col gap-2">
                        {product.sizes.map((size, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <input
                              type="radio"
                              id={`size-${i}`}
                              name="size"
                              value={size}
                              checked={selectedSize === size}
                              onChange={handleSizeChange}
                              className="peer cursor-pointer"
                            />
                            <label
                              htmlFor={`size-${i}`}
                              className="cursor-pointer text-sm font-semibold capitalize text-black-50 transition-colors duration-200 peer-checked:text-orange-50"
                            >
                              {size}{" "}
                              <span>
                                {isNaN(product.extraSizePriceCents[size] / 100)
                                  ? ""
                                  : `+ $${formatCurrency(product.extraSizePriceCents[size])}`}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Extras */}
                  {product.extraIngredients && (
                    <div className="flex flex-col gap-3">
                      <p className="text-black-100">Extras:</p>
                      <div className="flex flex-col gap-2">
                        {product.extraIngredients.map((extraIngredient, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              id={`Extra-${i}`}
                              name={extraIngredient}
                              value={extraIngredient}
                              checked={extras.includes(extraIngredient)}
                              onChange={handleExtraChange}
                              className="peer cursor-pointer"
                            />
                            <label
                              htmlFor={`Extra-${i}`}
                              className="cursor-pointer text-sm font-semibold capitalize text-black-50 transition-colors duration-200 peer-checked:text-orange-50"
                            >
                              {extraIngredient}{" "}
                              <span>{`+ $${formatCurrency(product.extraIngredientsPriceCents[extraIngredient])}`}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid h-12 max-w-[150px] grid-cols-3 place-items-center border">
                  <button
                    onClick={decrementQuantity}
                    className="grid h-full w-full place-items-center border-r transition-colors duration-200 hover:bg-slate-100 [&>svg]:stroke-orange-50"
                  >
                    <Minus />
                  </button>
                  <p className="grid h-full w-full place-items-center bg-slate-100 text-lg font-semibold">
                    {quantity}
                  </p>
                  <button
                    onClick={incrementQuantity}
                    className="grid h-full w-full place-items-center border-l transition-colors duration-200 hover:bg-slate-100 [&>svg]:stroke-orange-50"
                  >
                    <Plus />
                  </button>
                </div>
                <Button
                  size="md"
                  radius="sm"
                  onClick={handleAddToCart}
                  className={mergeClasses("w-fit")}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Similar Products in the same category */}
      <Slider sliderTitle="Similar Items" filteredProducts={relatedProducts} />
    </>
  );
};

export default ProductPage;
