"use client";

import { useState } from "react";

export default function SidebarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
}
