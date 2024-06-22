"use client";

import { useEffect, useState } from "react";
import UserProfileForm from "@/components/UserProfileForm";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";

const override = {
  borderWidth: "3px",
};

const EditUser = () => {
  const params = useParams();
  const { userId } = params;
  const { status } = useSession();

  const [userData, setUserData] = useState(null);
  const [savingInformation, setSavingInformation] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchUserData = fetch("/api/users").then((res) => res.json());
    const fetchProfile = fetch("/api/profile").then((res) => res.json());

    Promise.all([fetchUserData, fetchProfile])
      .then(([usersData, profileData]) => {
        const user = usersData.find((user) => user._id === userId);
        setUserData(user);
        setIsAdmin(profileData.isAdmin);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [userId, isAdmin]);

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
      <div className="absolute inset-0 grid min-h-screen w-full place-items-center text-lg font-semibold">
        Unauthorized. You don&apos;t have permission to access this page.
      </div>
    );
  }

  const handleProfileUpdate = async (e, data) => {
    e.preventDefault();
    setSavingInformation(true);

    const updateProfile = async () => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Profile update failed");
      }
    };

    toast
      .promise(updateProfile(), {
        loading: "Updating profile...",
        success: "Profile updated successfully!",
        error: "Failed to update profile. Please try again.",
      })
      .finally(() => {
        setSavingInformation(false);
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-center text-2xl font-bold text-orange-50 md:text-4xl">
        Edit User Information
      </h1>

      <UserProfileForm
        userData={userData}
        onSave={handleProfileUpdate}
        savingInformation={savingInformation}
      />
    </div>
  );
};

export default EditUser;
