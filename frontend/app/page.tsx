"use client";
import { useRouter } from "next/navigation";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const navigateToFlow = () => {
    router.push("/custom-flow");
  };

  return (
    <div className="h-full w-full">
      <Button onClick={navigateToFlow}>New</Button>
    </div>
  );
}
