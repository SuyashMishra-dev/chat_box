"use client";

import "./globals.css";
import SideNav from "@/components/navbar/SideNav";
import SubNavBar from "@/components/subNavBar/SubNavBar";
import { AppContext, AppContextType, AppDataInterface } from "@/providers";
import { getLocalStorage } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname: any = usePathname();
  const [appData, setAppData] = useState<AppDataInterface>({
    userData: null,
    card: null,
    hideGalleryOnMobile: false,
  });

  useEffect(() => {
    const user = getLocalStorage("userName");
    if (user)
      setAppData({ ...appData, userData: { userName: user as string } });
  }, []);
  return (
    <html lang="en">
      <body>
        <AppContext.Provider value={{ appData, setAppData }}>
          <div className="flex bg-[#C3B9AB]">
            {pathname !== "/" ? (
              <>
                <SideNav />
                <div
                  className={`${
                    appData?.hideGalleryOnMobile ? "hidden lg:block" : ""
                  }`}
                >
                  <SubNavBar />
                </div>
              </>
            ) : null}
            {children}
          </div>
        </AppContext.Provider>
      </body>
    </html>
  );
}
