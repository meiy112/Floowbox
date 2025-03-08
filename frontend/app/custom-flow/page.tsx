"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@xyflow/react/dist/style.css";
import CustomFlow from "./CustomFlow";
import TopMenu from "./TopMenu";
import { PipelineProvider } from "../context/PipelineProvider";
import { NodeConnectionProvider } from "../context/NodeConnectionProvider";

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
    <PipelineProvider>
      <NodeConnectionProvider>
        <CustomFlow
          isFrontend={isFrontend}
          navigateHome={navigateHome}
          toggleFrontend={() => setIsFrontend((prev) => !prev)}
        />
      </NodeConnectionProvider>
    </PipelineProvider>
  );
}
