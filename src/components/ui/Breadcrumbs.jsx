import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Container from "../layout/Container";
import { mergeClasses } from "@/lib/utils";

const Breadcrumb = React.forwardRef(({ ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={mergeClasses(
      "text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={mergeClasses("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        className={mergeClasses(
          "transition-colors hover:text-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={mergeClasses("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={mergeClasses("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={mergeClasses(
      "flex h-9 w-9 items-center justify-center",
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

const Breadcrumbs = ({ page, productCategory, pageName }) => {
  return (
    <Container className="relative min-h-[10rem] bg-breadcrumb-bg bg-cover bg-center bg-no-repeat">
      <div className="pointer-events-none absolute inset-0 h-full overflow-hidden bg-black-50/10"></div>
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-3xl font-bold uppercase text-white-50 md:text-4xl">
          {page}
        </h1>
        <Breadcrumb>
          <BreadcrumbList
            className={mergeClasses("justify-center gap-1 sm:gap-2")}
          >
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-orange-50 sm:text-base"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="[&>svg]:stroke-white-50" />
            {productCategory && (
              <>
                <BreadcrumbItem className="text-sm font-medium capitalize text-slate-300 md:!text-base">
                  {productCategory}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="[&>svg]:stroke-white-50" />
              </>
            )}
            {pageName && (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-semibold capitalize text-orange-50 md:text-base">
                  {pageName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </Container>
  );
};

export default Breadcrumbs;
