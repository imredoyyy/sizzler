import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeClasses = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (priceCents) => {
  return (Math.round(priceCents) / 100).toFixed(2);
};

export const formatDbTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  // Format the date and time components
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const period = hours < 12 ? "AM" : "PM";
  hours = hours % 12 || 12;

  const formattedDateTime = `${year}-${month}-${day}, ${hours}:${minutes} ${period}`;

  return formattedDateTime;
};
