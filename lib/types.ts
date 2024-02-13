import { getSidebarMetaData } from "@/actions/sidebar-actions";
import { Prisma } from "@prisma/client";
import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type SidebarMetaData = Prisma.PromiseReturnType<
  typeof getSidebarMetaData
>;
