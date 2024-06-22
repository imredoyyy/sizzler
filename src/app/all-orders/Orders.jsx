"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { formatCurrency, formatDbTimestamp, mergeClasses } from "@/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  borderWidth: "3px",
};

const Orders = ({ userIsAdmin }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationButtons = [];
  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    const page = searchParams.get("page");

    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    router.push(`?page=${pageNumber}`, { scroll: false });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const allProducts = orders.flatMap((order) =>
    order.products.map((product) => ({ ...product, order })),
  );

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  for (let i = 1; i <= Math.ceil(allProducts.length / productsPerPage); i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={mergeClasses(
          "grid aspect-square w-9 place-items-center rounded-full text-orange-50 transition-colors duration-300 md:hover:bg-orange-50 md:hover:text-white-50",
          i === currentPage && "bg-orange-50 text-white-50",
        )}
      >
        {i}
      </button>,
    );
  }

  return (
    <>
      {loading && (
        <div className="grid min-h-screen w-full place-items-center">
          <ClipLoader
            color="#f13a00"
            size={60}
            loading={loading}
            cssOverride={override}
          />
        </div>
      )}

      <div className="flex w-full flex-col gap-10">
        {orders.length > 0 && (
          <h1 className="overflow-hidden text-center text-2xl font-bold text-orange-50 md:text-4xl">
            {userIsAdmin ? "All Orders" : "Your Orders"}
          </h1>
        )}

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  {userIsAdmin && <TableHead>Customer Email</TableHead>}
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Extras</TableHead>
                  <TableHead className="text-right">Payment</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map(({ order, ...product }) => (
                  <TableRow key={`${order._id}-${product.id}`}>
                    <TableCell>{formatDbTimestamp(order.createdAt)}</TableCell>
                    {userIsAdmin && <TableCell>{order.userEmail}</TableCell>}
                    <TableCell className="flex flex-col gap-2">
                      <Link
                        href={`/products/${product.category}/${product.id}`}
                        className="font-medium transition-colors duration-300 md:hover:text-orange-50"
                      >
                        {product.name}
                      </Link>

                      {product.size && (
                        <p className="capitalize">
                          Size:{" "}
                          <span className="text-black-100">{product.size}</span>
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.quantity}
                    </TableCell>
                    <TableCell>
                      {product.extras.length > 0
                        ? product.extras.map((extra) => extra).join(", ")
                        : "None"}
                    </TableCell>
                    <TableCell
                      className={mergeClasses(
                        "text-center capitalize",
                        order.paid ? "text-green-500" : "text-red-500",
                      )}
                    >
                      {order.paid ? "Paid" : "Not Paid"}
                    </TableCell>
                    <TableCell className="text-center">
                      ${formatCurrency(product.priceCents)}
                    </TableCell>
                    <TableCell>
                      <Link href={`/orders/${order._id}?viewingOrder=true`}>
                        <Button radius="sm">View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>No orders</div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4">
            {allProducts.length > 10 && paginationButtons}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
