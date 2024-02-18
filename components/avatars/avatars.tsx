import { getUserInitials } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserAvatar = () => {
  const { user } = useKindeBrowserClient();
  return (
    <Avatar>
      <AvatarImage src={user?.picture!} />
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
