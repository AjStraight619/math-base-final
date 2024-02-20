import useLocalStorage from "@/hooks/useLocalStorage";
import { getUserInitials } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserAvatar = () => {
  const { user } = useKindeBrowserClient();
  const [avatarUrl, setAvatarUrl] = useLocalStorage<string | null>(
    "userAvatar",
    null
  );

  useEffect(() => {
    if (user?.picture && user.picture !== avatarUrl) {
      setAvatarUrl(user.picture);
    }
  }, [user, avatarUrl, setAvatarUrl]);

  return (
    <Avatar>
      <AvatarImage src={avatarUrl ?? undefined} alt="User avatar" />
      <AvatarFallback>
        {getUserInitials(user?.given_name, user?.family_name)}
      </AvatarFallback>
    </Avatar>
  );
};

export const AiAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
};
