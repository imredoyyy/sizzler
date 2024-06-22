import Burger from "/public/images/burger.png";
import Pizza from "/public/images/pizza.png";
import Beer from "/public/images/beer.png";
import Pasta from "/public/images/pasta.png";
import Coffee from "/public/images/coffee.png";

import ChefIcon from "/public/icons/chef.svg";
import FreshIngredientsIcon from "/public/icons/fresh-ingredients.svg";
import AchievementIcon from "/public/icons/achievement.svg";
import DealIcon from "/public/icons/deal.svg";
import DeliveryIcon from "/public/icons/delivery.svg";
import ServiceIcon from "/public/icons/service.svg";

import Chef1 from "/public/images/chef-1.jpg";
import Chef2 from "/public/images/chef-2.jpg";
import Chef3 from "/public/images/chef-3.jpg";

import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export const Nav_Links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Menu",
    href: "/menu",
  },
  {
    title: "Reservation",
    href: "/reservation",
  },
];

export const UserTabLinks = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Orders",
    href: "/all-orders",
  },
  {
    title: "Users",
    href: "/users",
    adminOnly: true,
  },
];

export const Special_Menu_Data = [
  {
    title: "Burger",
    image: Burger,
  },
  {
    title: "Pizza",
    image: Pizza,
  },
  {
    title: "Beer",
    image: Beer,
  },
  {
    title: "Pasta",
    image: Pasta,
  },
  {
    title: "Coffee",
    image: Coffee,
  },
];

export const SizzlerSpeciality = [
  {
    title: "Skilled Chefs",
    icon: ChefIcon,
  },
  {
    title: "Fresh Ingredients",
    icon: FreshIngredientsIcon,
  },
  {
    title: "Quality Maintain",
    icon: AchievementIcon,
  },
  {
    title: "Best Deals & Offers",
    icon: DealIcon,
  },
  {
    title: "Home Delivery",
    icon: DeliveryIcon,
  },
  {
    title: "24/7 Service",
    icon: ServiceIcon,
  },
];

export const Choose_Us_Data = [
  {
    title: "Restaurants",
    count: "30",
  },
  {
    title: "Years of Experience",
    count: "15",
  },
  {
    title: "Total Menus",
    count: "40",
  },
  {
    title: "Happy Customers",
    count: "100",
  },
];

export const Social_Links = [
  {
    icon: <Facebook />,
    href: "https://www.facebook.com/",
  },
  {
    icon: <Instagram />,
    href: "https://www.instagram.com/",
  },
  {
    icon: <Twitter />,
    href: "https://www.twitter.com/",
  },
  {
    icon: <Linkedin />,
    href: "https://www.linkedin.com/",
  },
];

export const ChefData = [
  {
    name: "Vincent Bernard",
    position: "Head Chef",
    image: Chef1,
    socialLinks: [
      {
        icon: <Facebook />,
        href: "https://www.facebook.com/",
      },
      {
        icon: <Instagram />,
        href: "https://www.instagram.com/",
      },
      {
        icon: <Linkedin />,
        href: "https://www.linkedin.com/",
      },
    ],
  },
  {
    name: "Katherine Scott",
    position: "Meal Planner",
    image: Chef2,
    socialLinks: [
      {
        icon: <Facebook />,
        href: "https://www.facebook.com/",
      },
      {
        icon: <Instagram />,
        href: "https://www.instagram.com/",
      },
      {
        icon: <Linkedin />,
        href: "https://www.linkedin.com/",
      },
    ],
  },
  {
    name: "Samuel Stanley",
    position: "Buffet Manager",
    image: Chef3,
    socialLinks: [
      {
        icon: <Facebook />,
        href: "https://www.facebook.com/",
      },
      {
        icon: <Instagram />,
        href: "https://www.instagram.com/",
      },
      {
        icon: <Linkedin />,
        href: "https://www.linkedin.com/",
      },
    ],
  },
];
