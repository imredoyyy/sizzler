"use client";

import { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { mergeClasses } from "@/lib/utils";
import { CartContext } from "@/provider/AppContext";
import { Nav_Links } from "@/data/data";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import useWindowSize from "@/hooks/useWindowSize";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

const Header = () => {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const size = useWindowSize();
  const { cartProducts, getTotalQuantity } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const searchInputRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (pathname === "/dashboard/order") {
        document.body.classList.add("orderPage");
      } else {
        document.body.classList.remove("orderPage");
      }
    }
  }, [pathname]);

  // Close mobile menu if window size is greater than 1023px and currently opened
  useEffect(() => {
    if (size.width > 1023 && isOpen) {
      setIsOpen(false);
    }
  }, [size, isOpen]);

  if (userName) {
    if (userName.includes(" ")) {
      // If userName contains a space, take the first part
      userName = userName.split(" ")[0];
    } else {
      // Change the first letter of the userName to uppercase
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery) {
      const formattedQuery = searchQuery
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "+");

      router.push(`/search?q=${formattedQuery}`);
    }

    setSearchQuery("");
    setSearchBarVisible(false);
  };

  const totalQuantity = () => {
    if (!Array.isArray(cartProducts)) {
      return 0;
    }

    return getTotalQuantity(cartProducts);
  };

  return (
    <>
      {!pathname.includes("/dashboard") && (
        <>
          <header className="sticky top-0 z-20 w-full border-b border-white-50/50 bg-brown-50 p-4 md:px-8">
            <div className="mx-auto flex max-w-screen-xl items-center justify-between">
              <ul className="hidden items-center gap-5 lg:flex">
                {Nav_Links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={mergeClasses(
                        "font-semibold text-black-100 transition-colors duration-200 hover:text-orange-50 active:text-orange-50",
                        pathname === link.href ? "text-orange-50" : "",
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link href={"/"}>
                <h3 className="font-barlow text-2xl font-bold md:text-3xl">
                  Sizzler
                </h3>
              </Link>

              <div className="flex items-center gap-5">
                <div className="flex items-center gap-6">
                  {status === "authenticated" ? (
                    <>
                      <Link href="/profile" className="hidden lg:block">
                        <Button
                          size="md"
                          radius="sm"
                          className={mergeClasses("text-sm")}
                        >
                          Hello, {userName}
                        </Button>
                      </Link>

                      <Button
                        onClick={() => signOut()}
                        size="md"
                        radius="sm"
                        className={mergeClasses(
                          "hidden text-sm lg:inline-flex",
                        )}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href={"/login"} className="hidden lg:block">
                      <Button size="md" radius="sm" className="text-sm">
                        Login
                      </Button>
                    </Link>
                  )}

                  <div className="relative">
                    <button
                      onClick={() => {
                        setSearchBarVisible(!searchBarVisible);
                        searchInputRef.current.focus();
                      }}
                      className="hidden items-center gap-4 rounded-md border border-orange-300 px-4 py-1.5 transition-colors duration-200 hover:bg-brown-100 md:flex"
                    >
                      <span className="">Search... </span>
                      <span>
                        <Search className="size-5" />
                      </span>
                    </button>

                    <IconButton
                      className={mergeClasses("md:hidden")}
                      onClick={() => {
                        setSearchBarVisible(!searchBarVisible);
                        searchInputRef.current.focus();
                      }}
                      aria-label="Search"
                    >
                      {searchBarVisible ? (
                        <X className="size-5" />
                      ) : (
                        <Search className="size-5" />
                      )}
                    </IconButton>

                    <form
                      onSubmit={handleSearch}
                      className={mergeClasses(
                        "absolute right-0 flex rounded-md border bg-white-100 p-3 shadow-xl ring-1 ring-black-50/10 transition-all duration-300 ease-in-out md:p-4",
                        searchBarVisible
                          ? "pointer-events-auto top-[72px] opacity-100 md:top-20"
                          : "pointer-events-none top-28 opacity-0",
                      )}
                    >
                      <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-2">
                        <div>
                          <Search className="size-5 stroke-black-100" />
                        </div>
                        <input
                          onChange={(e) => setSearchQuery(e.target.value)}
                          value={searchQuery}
                          ref={searchInputRef}
                          type="text"
                          name="search"
                          id="search"
                          placeholder="Search"
                          className="min-w-[200px] bg-transparent px-1.5 py-2 text-sm text-black-100 outline-none placeholder:text-black-100"
                        />
                      </div>
                    </form>
                  </div>

                  <Link href="/cart" className="relative flex">
                    <IconButton aria-label="Cart">
                      <ShoppingCart />
                    </IconButton>
                    <span className="absolute -top-1 right-0 flex size-[18px] items-center justify-center rounded-full bg-orange-50 text-[11px] text-white-50">
                      {totalQuantity()}
                    </span>
                  </Link>
                </div>

                {/* Toggle Menu Open */}
                <IconButton
                  className={"lg:hidden"}
                  onClick={toggleMenu}
                  aria-label="Open Menu"
                >
                  <Menu />
                </IconButton>
              </div>
            </div>
          </header>

          <div
            onClick={toggleMenu}
            className={mergeClasses(
              "fixed left-full top-0 z-40 min-h-screen w-screen bg-white-50/20 backdrop-blur-sm  transition-all duration-500 ease-in-out",
              isOpen ? "left-0" : "",
            )}
          >
            <nav
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[16rem] bg-white-100 shadow-2xl ring-1 ring-white-50/10"
            >
              <div className="flex items-center justify-between border-b border-neutral-400 p-4">
                <h2 className="font-barlow text-3xl font-bold tracking-[-0.02em] md:text-3xl">
                  Sizzler
                </h2>
                <IconButton onClick={toggleMenu} aria-label="Close Menu">
                  <X />
                </IconButton>
              </div>
              <ul className="flex flex-col gap-4 border-b border-neutral-400 p-4">
                {Nav_Links.map((link, index) => (
                  <li key={index} className="w-full">
                    <Link
                      onClick={() => {
                        const timeoutId = setTimeout(() => {
                          setIsOpen(false);
                          clearTimeout(timeoutId);
                        }, 400);
                      }}
                      href={link.href}
                      className={mergeClasses(
                        "block font-semibold",
                        pathname === link.href ? "text-orange-50" : "",
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 p-4">
                {status === "authenticated" ? (
                  <>
                    <Button
                      onClick={() => signOut()}
                      size="md"
                      radius="sm"
                      className={mergeClasses("w-full bg-orange-50")}
                    >
                      Logout
                    </Button>
                    <Link href="/profile" className="block">
                      <Button size="md" radius="sm" className="w-full">
                        {userName}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href={"/login"} className="block w-full">
                    <Button
                      size="md"
                      radius="sm"
                      className={mergeClasses("w-full")}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
