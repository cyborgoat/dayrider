import Image from "next/image";
import Link from "next/link";
import { Button, NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Press me</Button>
      <Link href={"./schedule"}>Go to schedule</Link>
    </main>
  );
}
