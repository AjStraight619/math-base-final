import { SidebarMetaData } from "@/lib/types";

type SidebarChatProps = {
  sidebarMetaData: SidebarMetaData;
};

export const SidebarChat = ({ sidebarMetaData }: SidebarChatProps) => {
  const { chats, notes, error } = sidebarMetaData;
  return <ul></ul>;
};
