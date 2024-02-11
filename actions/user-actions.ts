"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getUserId = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  return userId;
};
