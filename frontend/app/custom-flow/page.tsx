"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@xyflow/react/dist/style.css";
import CustomFlow from "./CustomFlow";

export default function CustomFlowPage() {
  const router = useRouter();
  const [isFrontend, setIsFrontend] = useState(false);

  const toggleFrontend = () => {
    setIsFrontend((prev) => !prev);
  };

  const navigateHome = () => {
    router.push("/");
  };

  return (
    <div className="h-full w-full">
      <CustomFlow
        isFrontend={isFrontend}
        navigateHome={navigateHome}
        toggleFrontend={() => setIsFrontend((prev) => !prev)}
      />
    </div>
  );
}
