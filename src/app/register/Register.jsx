"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Container from "@/components/layout/Container";
import { mergeClasses } from "@/lib/utils";
import Button from "@/components/ui/Button";
import GoogleLogo from "@/assets/google.svg";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const handleRegistration = async (e) => {
    e.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setErrorMessage("");

    // If any of the input fields are empty or password length is
    //less than 6 characters, show an error message and return
    if (!name || !email || !password) {
      toast.error("All fields are required");
      setCreatingUser(false);
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setCreatingUser(false);
      return;
    }

    try {
      // Check if user already exists
      const resUserExists = await fetch("api/UserExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (resUserExists.status === 200) {
        const { user } = await resUserExists.json();
        if (user) {
          toast.error("User already exists.");
          setCreatingUser(false);
          return;
        }
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setErrorMessage("");
        setUserCreated(true);
        setCreatingUser(false);
      } else {
        toast.error("Something went wrong. Try agin.");
        setCreatingUser(false);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      toast.error("An error occurred during registration.");
      setCreatingUser(false);
    }
  };

  const handlePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <Container>
      <div className="flex flex-col items-center gap-6">
        <div className="flex w-full flex-col gap-2.5">
          <h2 className="text-center text-2xl font-bold text-orange-50 md:text-4xl">
            Create your account
          </h2>
          <p className="text-center text-black-100">
            Please fill in the details to get started
          </p>
          <div
            className={mergeClasses(
              "relative hidden min-h-5 w-full justify-center",
              userCreated ? "flex" : "",
              errorMessage ? "flex" : "",
            )}
          >
            {errorMessage && (
              <p className="absolute text-center">{errorMessage}</p>
            )}
            {userCreated && (
              <p className="absolute text-center">
                Account created. Login{" "}
                <Link
                  href={"/login"}
                  className="font-semibold text-black-50 underline underline-offset-4 transition-colors duration-200 hover:text-orange-50"
                >
                  here
                </Link>
              </p>
            )}
          </div>
        </div>

        <form
          className="flex min-w-[300px] max-w-md flex-col gap-7"
          onSubmit={handleRegistration}
        >
          <div className="flex flex-col gap-5">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={name}
                aria-required="true"
                disabled={creatingUser}
                onChange={(e) => setName(e.target.value)}
                id="input-name"
                placeholder="Name"
                className="animated-input peer"
              />
              <label htmlFor="input-name" className="animated-label">
                Name
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                disabled={creatingUser}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
                placeholder="Email"
                id="input-email"
                className="animated-input peer"
              />
              <label htmlFor="input-email" className="animated-label">
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type={passwordType}
                name="password"
                value={password}
                disabled={creatingUser}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                aria-required="true"
                id="input-password"
                placeholder="Password"
                className="animated-input peer"
              />
              <label htmlFor="input-password" className="animated-label">
                Password
              </label>
              <button
                type="button"
                onClick={handlePasswordType}
                className={mergeClasses(
                  "absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors duration-300 hover:bg-orange-50/15",
                  password.length > 0 ? "inline-flex" : "hidden",
                )}
              >
                {passwordType === "password" ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            <Button
              type="submit"
              size="md"
              isLoading={creatingUser}
              radius="sm"
              disabled={creatingUser}
              className={mergeClasses(
                "py-3 text-base font-medium disabled:cursor-not-allowed disabled:bg-orange-100",
              )}
            >
              Register
            </Button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="h-px w-full bg-black-100/50" />
              <p className="text-sm">Or</p>
              <div className="h-px w-full bg-black-100/50" />
            </div>

            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google", { callbackUrl: "/" });
                }}
                size="md"
                radius="sm"
                type="submit"
                className={mergeClasses(
                  "w-full border border-slate-300 bg-transparent text-black-100 transition-colors duration-300 hover:border-orange-50/60 active:bg-orange-100/30 active:text-black-50 md:hover:bg-orange-100/30 md:hover:text-black-50",
                )}
              >
                <Image src={GoogleLogo} alt="Google" height={32} width={32} />
                <span>Register With Google</span>
              </Button>
            </div>
          </div>
        </form>
        <div className="min-w-[300px] border-t border-black-100/50 py-3">
          <p className="whitespace-nowrap text-center text-black-100">
            Already have an account? &nbsp;
            <Link
              href={"/login"}
              className="font-medium text-black-50 underline underline-offset-4 transition-colors duration-200 hover:text-orange-50"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;
