"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/providers";
import { getLocalStorage, setLocalStorage } from "@/utils/utils";

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const { appData, setAppData } = useContext(AppContext);

  const createRoom = () => {
    if (userName.trim()) {
      setAppData({ ...appData, userData: { userName: userName } });
      setLocalStorage("userName", userName);
      router.push(`/chat`);
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center">
          Welcome! Enter your details
        </h1>
        <div className="space-y-4">
          <Input
            type="text"
            value={userName}
            onChange={(e: any) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
            onKeyDown={(ev: React.KeyboardEvent) => {
              if (ev.key === "Enter") {
                createRoom();
              }
            }}
          />
          <Button onClick={createRoom} className="w-full">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
