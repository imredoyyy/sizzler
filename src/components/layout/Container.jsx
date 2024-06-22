import * as React from "react";

import { mergeClasses } from "@/lib/utils";

const Container = ({ className, children, ...props }) => {
  return (
    <section
      className={mergeClasses("w-full py-16 md:py-20", className)}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8">
        {children}
      </div>
    </section>
  );
};

export default Container;
