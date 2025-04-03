"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Hello, Mainstack</h1>
      <Button onClick={() => router.push("/revenue")}>Go to Revenue</Button>
    </div>
  );
}
