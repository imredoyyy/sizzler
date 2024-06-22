"use client";

import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { redirect } from "next/navigation";
import UserTab from "@/components/layout/UserTab";

const override = {
  borderWidth: "3px",
};

const Users = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchUsers = fetch("/api/users").then((res) => res.json());
    const fetchProfile = fetch("/api/profile").then((res) => res.json());

    Promise.all([fetchUsers, fetchProfile])
      .then(([usersData, profileData]) => {
        setUsers(usersData);
        setIsAdmin(profileData.isAdmin);
        console.log("isAdmin", profileData.isAdmin);
        console.log("profiledata", profileData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="grid min-h-screen w-full place-items-center">
        <ClipLoader
          color="#f13a00"
          size={60}
          loading={loading}
          cssOverride={override}
        />
      </div>
    );
  } else if (status === "unauthenticated") {
    redirect("/login");
  }

  if (status === "authenticated" && !isAdmin) {
    return (
      <div className="absolute inset-0 grid min-h-screen w-full place-items-center text-center text-lg font-semibold">
        Unauthorized. You don&apos;t have permission to access this page.
      </div>
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
      <div className="flex w-full flex-col gap-8">
        <UserTab isAdmin={isAdmin} />
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-bold text-orange-50 md:text-4xl">
            All Users
          </h1>

          <div className="mx-auto w-full max-w-4xl">
            <div className="flex w-full flex-col gap-4 md:gap-6">
              {users?.length > 0 &&
                users.map((user) => (
                  <div key={user._id} className="user-grid">
                    <div className="grid grid-cols-2 gap-2.5">
                      <p>{user.name}</p>
                      <p>{user.email}</p>
                    </div>
                    <Link href={`/users/${user._id}`}>
                      <Button radius="sm" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
