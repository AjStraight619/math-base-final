"use client";

import {
  LoginLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  const { user } = useKindeBrowserClient();
  return (
    <div
      id="home"
      className="flex flex-row items-center justify-center gap-4 mt-20"
    >
      {user ? (
        <Link
          className="group border-2 flex px-3 py-6 rounded-lg text-black transition duration-300 ease-in-out bg-gradient-to-r from-gray-200 to-gray-400"
          href="/dashboard"
        >
          Continue to dashboard
          <span className="ml-2 transition-transform transform translate-x-0 group-hover:translate-x-1">
            <MoveRight />
          </span>
        </Link>
      ) : (
        <>
          <RegisterLink className="border-2 bg-primary py-3 px-6 rounded-lg text-black">
            Sign up
          </RegisterLink>
          <LoginLink className="border-2  bg-transparent py-3 px-6 rounded-lg">
            Log in
          </LoginLink>
        </>
      )}
    </div>
  );
};

export default CallToAction;
