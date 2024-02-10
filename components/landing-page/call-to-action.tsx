"use client";

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const CallToAction = () => {
  return (
    <div
      id="home"
      className="flex flex-col items-center justify-center gap-4 mt-40"
    >
      <RegisterLink className="border-2 border-violet-500 bg-violet-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-violet-500 hover:shadow-violet-500/50 transition duration-300 ease-in-out">
        Sign up
      </RegisterLink>
      <LoginLink className="border-2 border-violet-500 bg-transparent text-violet-600 text-lg font-semibold py-3 px-6 rounded-lg hover:bg-violet-500 hover:text-white transition duration-300 ease-in-out">
        Log in
      </LoginLink>
    </div>
  );
};

export default CallToAction;
