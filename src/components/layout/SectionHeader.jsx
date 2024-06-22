import { mergeClasses } from "@/lib/utils";
import React from "react";

const SectionHeader = ({
  subtitle,
  title,
  description,
  subtitleClass,
  titleClass,
  descClass,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <h3
        className={mergeClasses(
          "text-center text-xl font-semibold capitalize text-orange-50",
          subtitleClass,
        )}
      >
        {subtitle}
      </h3>
      <h1
        className={mergeClasses(
          "mx-auto text-center font-bold capitalize md:text-4xl",
          titleClass,
        )}
      >
        {title}
      </h1>
      {description && (
        <p
          className={mergeClasses(
            "mx-auto max-w-2xl text-center text-black-100",
            descClass,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
