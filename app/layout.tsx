import { getSidebarMetaData } from "@/actions/sidebar-actions";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Sidebar from "@/components/sidebar/sidebar";
import ActiveItemContextProvider from "@/context/active-item-context";
import ActiveSectionContextProvider from "@/context/active-section-context";
import SidebarContextProvider from "@/context/sidebar-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Math Base",
  description: "All in one AI assisted math learning platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarMetaData = await getSidebarMetaData();

  return (
    <>
      <html lang="en" suppressHydrationWarning className="!scroll-smooth">
        <head />
        <body className={`${inter.className} relative`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ActiveSectionContextProvider>
              <ActiveItemContextProvider>
                <SidebarContextProvider>
                  <Sidebar sidebarMetaData={sidebarMetaData} />
                  {children}
                </SidebarContextProvider>
              </ActiveItemContextProvider>
            </ActiveSectionContextProvider>
            {/* <ModeToggle /> */}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
