"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Container from "@/components/layout/Container";
import { mergeClasses } from "@/lib/utils";
import Button from "@/components/ui/Button";
import GoogleLogo from "@/assets/google.svg";
import { Eye, EyeOff } from "lucide-react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginProgress(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response.ok) {
        setErrorMessage("Invalid credentials");
        setLoginProgress(false);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }

    setLoginProgress(false);
  };

  const handlePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <Container>
      <div className="flex flex-col items-center gap-6">
        <div className="flex w-full flex-col gap-2.5">
          <h2 className="text-center text-2xl font-bold text-orange-50 md:text-4xl">
            Login to your account
          </h2>
          <p className="text-black-100 text-center">
            Please fill in the details to get started
          </p>
          <p className="min-h-4 text-center">{errorMessage}</p>
        </div>

        <form
          className="flex min-w-[300px] max-w-md flex-col gap-7"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col gap-5">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                inputMode="email"
                autoComplete="username"
                disabled={loginProgress}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                disabled={loginProgress}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
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
                  "fo absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 !outline-none transition-colors duration-300 hover:bg-orange-50/15",
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
              radius="sm"
              disabled={loginProgress}
              className={mergeClasses(
                "py-3 text-base font-medium disabled:cursor-not-allowed disabled:bg-orange-100",
              )}
            >
              Login
            </Button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="bg-black-100/50 h-px w-full" />
              <p className="text-sm">Or</p>
              <div className="bg-black-100/50 h-px w-full" />
            </div>

            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google", { callbackUrl: "/" });
                }}
                size="md"
                type="submit"
                className={mergeClasses(
                  "text-black-100 active:text-black-50 md:hover:text-black-50 w-full border border-slate-300 bg-transparent transition-colors duration-300 hover:border-orange-50/60 active:bg-orange-100/30 md:hover:bg-orange-100/30",
                )}
              >
                <Image src={GoogleLogo} alt="Google" height={32} width={32} />
                <span>Log in With Google</span>
              </Button>
            </div>
          </div>
        </form>
        <div className="border-black-100/50 min-w-[300px] border-t py-3">
          <p className="text-black-100 whitespace-nowrap text-center">
            Don&apos;t have an account? &nbsp;
            <Link
              href={"/register"}
              className="text-black-50 font-medium underline underline-offset-4 transition-colors duration-200 hover:text-orange-50"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default LogIn;
