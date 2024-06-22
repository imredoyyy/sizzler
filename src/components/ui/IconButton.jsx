import { mergeClasses } from "@/lib/utils";

const IconButton = ({ className, children, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={mergeClasses(
        "inline-flex items-center justify-center rounded-lg p-1.5 transition-colors duration-300 hover:bg-white-50 [&_svg]:size-6 [&_svg]:hover:stroke-orange-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
