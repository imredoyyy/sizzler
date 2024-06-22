"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mergeClasses } from "@/lib/utils";
import { UserTabLinks } from "@/data/data";

const UserTab = ({ isAdmin }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-5">
      {UserTabLinks.filter((link) => !link.adminOnly || isAdmin).map(
        (link, i) => (
          <Link
            href={link.href}
            key={i}
            className={mergeClasses(
              "grid place-items-center rounded-lg border border-slate-800 px-4 py-2.5 font-medium text-orange-50 transition-colors duration-300 md:hover:border-orange-100 md:hover:bg-orange-50 md:hover:text-white-100",
              pathname === link.href &&
                "border-orange-100 bg-orange-50 text-white-100",
            )}
          >
            {link.title}
          </Link>
        ),
      )}
    </div>
  );
};

export default UserTab;
