"use client";

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const CallToAction = () => {
  return (
    <div
      id="home"
      className="flex flex-row items-center justify-center gap-4 mt-20"
    >
      <RegisterLink className="border-2 bg-primary dark:text-black text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary/50 hover:shadow-gray-500/50 transition duration-300 ease-in-out">
        Sign up
      </RegisterLink>
      <LoginLink className="border-2  bg-transparent dark:text-white text-lg font-semibold py-3 px-6 rounded-lg  hover:bg-zinc-900 hover:shadow-gray-500/50 shadow-md  transition duration-300 ease-in-out">
        Log in
      </LoginLink>
    </div>
  );
};

export default CallToAction;
