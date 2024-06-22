"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import DummyProfileImage from "/public/images/dummy-profile.png";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";
import UserProfileForm from "@/components/UserProfileForm";
import ClipLoader from "react-spinners/ClipLoader";
import UserTab from "@/components/layout/UserTab";

const override = {
  borderWidth: "3px",
};

const ProfilePageForm = () => {
  const { data: session, status } = useSession();

  const userImage = session?.user?.image;
  const [userData, setUserData] = useState(null);
  const [savingInformation, setSavingInformation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((res) => {
        setLoading(true);
        res.json().then((data) => {
          setIsAdmin(data.isAdmin);
          setUserData(data);
          setLoading(false);
        });
      });
    }
  }, [status, session]);

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

      <div className="flex flex-col gap-8">
        <UserTab isAdmin={isAdmin} />
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col gap-12">
            <h1 className="font-barlow text-2xl font-bold">Profile</h1>
            <div className="flex flex-col gap-8">
              <div className="flex w-full items-center justify-between">
                <div className="text-lg font-medium">
                  Hello,{" "}
                  <span className="text-orange-50">{userData?.name}</span>
                </div>
                <div className="relative">
                  <Image
                    src={userImage || DummyProfileImage}
                    alt="user"
                    width={80}
                    height={80}
                    className="max-h-20 w-20 rounded-xl object-contain"
                  />
                  <label
                    htmlFor="image-upload"
                    className="absolute -bottom-1 right-0 cursor-pointer rounded-full bg-orange-100 p-1 [&>svg]:size-[18px] [&>svg]:stroke-white-50"
                  >
                    <Camera />
                  </label>
                  <input
                    type="file"
                    name="image-upload"
                    id="image-upload"
                    className="hidden"
                  />
                </div>
              </div>

              {isAdmin && (
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="isAdmin"
                    className="cursor-pointer font-medium"
                  >
                    Admin
                  </label>
                  <input
                    type="checkbox"
                    id="isAdmin"
                    readOnly
                    checked={isAdmin}
                  />
                </div>
              )}

              <UserProfileForm
                userData={userData}
                onSave={handleProfileUpdate}
                savingInformation={savingInformation}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePageForm;
