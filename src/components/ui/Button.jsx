import { Button as NextButton } from "@nextui-org/button";
import { mergeClasses } from "@/lib/utils";

import React from "react";

const Button = ({ children, className, onClick, ...props }) => {
  return (
    <NextButton
      className={mergeClasses(
        "h-auto bg-orange-50 py-2.5 text-base font-medium text-white-50 transition-colors duration-200 md:hover:bg-orange-100 [&_svg]:stroke-white-50",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </NextButton>
  );
};

export default Button;
