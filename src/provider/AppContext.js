"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// Utility function to compare two arrays for equality
const arraysAreEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
};

export const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cartProducts")) {
      setCartProducts(JSON.parse(ls.getItem("cartProducts")));
    }
  }, [ls]);

  function saveToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }

  const addToCart = (product, quantity, size = null, extras = []) => {
    setCartProducts((prevProducts) => {
      const matchingProduct = prevProducts.find(
        (prevProduct) =>
          prevProduct.id === product.id &&
          prevProduct.size === size &&
          arraysAreEqual(prevProduct.extras, extras),
      );

      let adjustedPrice = product.priceCents; // Base price

      // Adjust the price based on the selected size's extra price
      if (
        size &&
        product.extraSizePriceCents &&
        product.extraSizePriceCents[size]
      ) {
        adjustedPrice += product.extraSizePriceCents[size];
      }

      // Adjust the price based on the selected extra ingredients
      extras.forEach((ingredient) => {
        if (
          product.extraIngredientsPriceCents &&
          product.extraIngredientsPriceCents[ingredient]
        ) {
          adjustedPrice += product.extraIngredientsPriceCents[ingredient];
        }
      });

      let updatedProducts;
      if (matchingProduct) {
        updatedProducts = prevProducts.map((prevProduct) =>
          prevProduct.id === product.id &&
          prevProduct.size === size &&
          arraysAreEqual(prevProduct.extras, extras)
            ? {
                ...prevProduct,
                quantity: prevProduct.quantity + quantity,
                priceCents: adjustedPrice, // Update the price
              }
            : prevProduct,
        );
      } else {
        updatedProducts = [
          ...prevProducts,
          { ...product, quantity, size, extras, priceCents: adjustedPrice },
        ];
      }

      saveToLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  // Increment product quantity in the cart page
  const incrementQuantity = (productId, size, extras = []) => {
    setCartProducts((prevProducts) => {
      const newProducts = prevProducts.map((prevProduct) => {
        if (
          prevProduct.id === productId &&
          prevProduct.size === size &&
          arraysAreEqual(prevProduct.extras, extras)
        ) {
          return { ...prevProduct, quantity: prevProduct.quantity + 1 };
        }
        return prevProduct;
      });
      saveToLocalStorage(newProducts);
      return newProducts;
    });
  };

  // Decrement product quantity in the cart page
  const decrementQuantity = (productId, size = null, extras = []) => {
    setCartProducts((prevProducts) => {
      const newProducts = prevProducts.map((prevProduct) => {
        if (
          prevProduct.id === productId &&
          prevProduct.size === size &&
          arraysAreEqual(prevProduct.extras, extras)
        ) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity > 1 ? prevProduct.quantity - 1 : 1,
          };
        }
        return prevProduct;
      });
      saveToLocalStorage(newProducts);
      return newProducts;
    });
  };

  // Remove product from the cart
  const removeFromCart = (productId, size = null, extras = null) => {
    const updatedCartProducts = cartProducts.filter((product) => {
      // Check if the product ID matches the one to remove
      if (product.id === productId) {
        // If size is specified and does not match, keep the product
        if (size && product.size !== size) {
          return true;
        }
        // If extras are specified and do not match, keep the product
        if (extras && !arraysAreEqual(product.extras, extras)) {
          return true;
        }
        // If both size and extras are specified and match, remove the product
        if (
          size &&
          product.size === size &&
          extras &&
          arraysAreEqual(product.extras, extras)
        ) {
          return false;
        }
        // If only size is specified and it matches, remove the product
        if (size && product.size === size && !extras) {
          return false;
        }
        // If only extras are specified and they match, remove the product
        if (!size && extras && arraysAreEqual(product.extras, extras)) {
          return false;
        }
        // If no size and no extras are specified, remove the product
        if (!size && !extras) {
          return false;
        }
      }
      // Keep the product if it doesn't match the conditions above
      return true;
    });

    setCartProducts(updatedCartProducts);
    saveToLocalStorage(updatedCartProducts);
  };

  // Get total quantity of the cart
  const getTotalQuantity = (cartProducts) => {
    let totalQuantity = 0;

    for (const product of cartProducts) {
      totalQuantity += product.quantity;
    }
    return totalQuantity;
  };

  // Remove all products from the cart
  const clearCart = () => {
    setCartProducts([]);
    saveToLocalStorage([]);
  };

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeFromCart,
          clearCart,
          incrementQuantity,
          decrementQuantity,
          getTotalQuantity,
        }}
      >
        <NextUIProvider>{children}</NextUIProvider>
      </CartContext.Provider>
    </SessionProvider>
  );
};
