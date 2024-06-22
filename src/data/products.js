import CheesePizza from "@/assets/product-images/cheese-pizza.png";
import ChickenBurger from "@/assets/product-images/chicken-burger.png";
import ChickenSandwich from "@/assets/product-images/chicken-sandwich.png";
import FrenchFries from "@/assets/product-images/french-fries.png";
import PepperoniPizza from "@/assets/product-images/pepperoni-pizza.png";
import VegetablePizza from "@/assets/product-images/veg-pizza.png";
import MushroomBurger from "@/assets/product-images/mushroom-burger.png";
import CherryPizza from "@/assets/product-images/cherry-pizza.png";
import BlueCocktail from "@/assets/product-images/blue-cocktail.png";
import Negroni from "@/assets/product-images/negroni.png";
import MintLemonade from "@/assets/product-images/mint-lemonade.png";
import HamSandwich from "@/assets/product-images/ham-sandwich.png";
import PaniniSandwich from "@/assets/product-images/panini-sandwich.png";
import CaesarPasta from "@/assets/product-images/caesar-pasta.png";
import MeatballPasta from "@/assets/product-images/pasta-meat-balls.png";
import OriginalSushi from "@/assets/product-images/original-sushi.png";
import MakiSushi from "@/assets/product-images/maki-sushi.png";
import SushiRiceball from "@/assets/product-images/sushi-riceball.png";
import ShrimpPasta from "@/assets/product-images/shrimp-pasta.png";

export const products = [
  {
    id: "pz-001",
    name: "Cheese Pizza",
    priceCents: 1299,
    image: CheesePizza,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "pizza",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 200,
      large: 400,
    },
  },
  {
    id: "bg-001",
    name: "Chicken Burger",
    priceCents: 799,
    image: ChickenBurger,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "burger",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 200,
      large: 400,
    },
  },
  {
    id: "ss-001",
    name: "Original Sushi",
    priceCents: 1899,
    image: OriginalSushi,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "sushi",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 350,
      large: 500,
    },
    extraIngredients: ["Extra Rice", "Extra Fish"],
    extraIngredientsPriceCents: {
      "Extra Rice": 300,
      "Extra Fish": 450,
    },
    specialMenu: true,
  },
  {
    id: "sw-001",
    name: "Chicken Sandwich",
    priceCents: 549,
    image: ChickenSandwich,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "sandwich",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 400,
      large: 600,
    },
    extraIngredients: ["Extra Lettuce", "Extra Mayonnaise"],
    extraIngredientsPriceCents: {
      "Extra Lettuce": 100,
      "Extra Mayonnaise": 200,
    },
  },
  {
    id: "dr-001",
    name: "Blue Cocktail",
    priceCents: 499,
    image: BlueCocktail,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "drinks",
  },
  {
    id: "ps-001",
    name: "Caesar Pasta",
    priceCents: 799,
    image: CaesarPasta,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "pasta",
    sizes: ["regular", "medium"],
    extraSizePriceCents: {
      medium: 200,
    },
    extraIngredients: ["Extra Cheese", "Extra Salad"],
    extraIngredientsPriceCents: {
      "Extra Cheese": 250,
      "Extra Salad": 100,
    },
  },
  {
    id: "pz-002",
    name: "Pepperoni Pizza",
    priceCents: 1039,
    image: PepperoniPizza,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "pizza",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 300,
      large: 400,
    },
  },
  {
    id: "fr-001",
    name: "French Fries",
    priceCents: 399,
    image: FrenchFries,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "fries",
  },
  {
    id: "dr-002",
    name: "Negroni",
    priceCents: 399,
    image: Negroni,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "drinks",
  },
  {
    id: "pz-003",
    name: "Vegetable Pizza",
    priceCents: 999,
    image: VegetablePizza,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "pizza",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 400,
      large: 600,
    },
    extraIngredients: ["Extra Cheese", "Mixed Vegetables"],
    extraIngredientsPriceCents: {
      "Extra Cheese": 200,
      "Mixed Vegetables": 300,
    },
  },
  {
    id: "bg-002",
    name: "Mushroom Burger",
    priceCents: 1149,
    image: MushroomBurger,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "burger",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 150,
      large: 220,
    },
  },
  {
    id: "dr-003",
    name: "Mint Lemonade",
    priceCents: 599,
    image: MintLemonade,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "drinks",
  },
  {
    id: "pz-004",
    name: "Cherry Pizza",
    priceCents: 1299,
    image: CherryPizza,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "pizza",
    sizes: ["regular", "Medium", "Large"],
    extraSizePriceCents: {
      medium: 500,
      large: 800,
    },
    extraIngredients: ["Cherry Toppings", "Almonds"],
    extraIngredientsPriceCents: {
      "Cherry Toppings": 200,
      Almonds: 300,
    },
  },
  {
    id: "sw-002",
    name: "Ham Sandwich",
    priceCents: 799,
    image: HamSandwich,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "sandwich",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 200,
      large: 400,
    },
    extraIngredients: ["Extra Cheese", "Extra Ham"],
    extraIngredientsPriceCents: {
      "Extra Cheese": 200,
      "Extra Ham": 300,
    },
  },
  {
    id: "ss-002",
    name: "Maki Sushi",
    priceCents: 1499,
    image: MakiSushi,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "sushi",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 500,
      large: 650,
    },
    extraIngredients: ["Extra Rice", "Extra Fish"],
    extraIngredientsPriceCents: {
      "Extra Rice": 350,
      "Extra Fish": 500,
    },
  },
  {
    id: "sw-003",
    name: "Panini Sandwich",
    priceCents: 799,
    image: PaniniSandwich,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    category: "sandwich",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 150,
      large: 250,
    },
  },
  {
    id: "ps-002",
    name: "Meatball Pasta",
    priceCents: 949,
    image: MeatballPasta,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "pasta",
    sizes: ["regular", "medium"],
    extraSizePriceCents: {
      medium: 200,
    },
    extraIngredients: ["Extra Meat", "Extra Sauce"],
    extraIngredientsPriceCents: {
      "Extra Meat": 250,
      "Extra Sauce": 100,
    },
    specialMenu: true,
  },
  {
    id: "ss-003",
    name: "Sushi Rice Ball",
    priceCents: 2549,
    image: SushiRiceball,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "sushi",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 500,
      large: 650,
    },
    extraIngredients: ["Extra Rice", "Extra Fish"],
    extraIngredientsPriceCents: {
      "Extra Rice": 350,
      "Extra Fish": 500,
    },
    specialMenu: true,
  },
  {
    id: "ps-003",
    name: "Shrimp Pasta",
    priceCents: 999,
    image: ShrimpPasta,
    description:
      "Etiam quis lobortis odio, at sodales mauris. Morbi fermentum pretium ligula, id efficitur quam mattis in. Fusce nec pretium ante. Vivamus vitae bibendum lacus, ac varius ligula.",
    shortDescription: "There are many variants of passages looks believable",
    category: "pasta",
    sizes: ["regular", "medium", "large"],
    extraSizePriceCents: {
      medium: 200,
      large: 350,
    },
    extraIngredients: ["Extra Shrimp", "Extra Sauce"],
    extraIngredientsPriceCents: {
      "Extra Shrimp": 300,
      "Extra Sauce": 150,
    },
    specialMenu: true,
  },
];
