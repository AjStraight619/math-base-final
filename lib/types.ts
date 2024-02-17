import { getSidebarMetaData } from "@/actions/sidebar-actions";
import { getDashboardData } from "@/app/dashboard/page";
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
