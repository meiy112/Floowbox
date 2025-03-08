"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@xyflow/react/dist/style.css";
import CustomFlow from "./CustomFlow";
import TopMenu from "./TopMenu";
import { PipelineProvider } from "../context/PipelineProvider";

export default function CustomFlowPage() {
  const router = useRouter();
  const [isFrontend, setIsFrontend] = useState(false);

  const toggleFrontend = () => {
    setIsFrontend((prev) => !prev);
  };

  const navigateHome = () => {
    router.push("/");
  };

  const setName = (name: string) => {
    console.log("hi");
  };

  return (
    <PipelineProvider>
      <div className="h-full w-full">
        <TopMenu
          isFrontend={isFrontend}
          toggleFrontend={toggleFrontend}
          name="Untitled"
          setName={setName}
        />
        <CustomFlow
          isFrontend={isFrontend}
          navigateHome={navigateHome}
          toggleFrontend={() => setIsFrontend((prev) => !prev)}
        />
      </div>
    </PipelineProvider>
  );
}
