import { getChatById } from "@/actions/chatActions";
import { getDashboardData } from "@/actions/dashboardActions";
import { getNoteById } from "@/actions/noteAction";
import { getSidebarMetaData } from "@/actions/sidebar-actions";
import { Prisma } from "@prisma/client";
import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type SidebarMetaData = Prisma.PromiseReturnType<
  typeof getSidebarMetaData
>;

export type DashboardItems = Prisma.PromiseReturnType<typeof getDashboardData>;

export type ChatWithLastMessage = Prisma.ChatGetPayload<{
  include: {
    messages: {
      orderBy: {
        createdAt: "desc";
      };
      take: 1;
    };
  };
}>[];

export type FolderWithLastNote = Prisma.FolderGetPayload<{
  include: {
    notes: {
      orderBy: {
        createdAt: "desc";
      };
      take: 1;
    };
  };
}>[];

export type Chat = Prisma.PromiseReturnType<typeof getChatById>;

export type Note = Prisma.PromiseReturnType<typeof getNoteById>;
