"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@xyflow/react/dist/style.css";
import { NodeConnectionProvider } from "./context/NodeConnectionProvider";
import { PipelineProvider } from "./context/PipelineProvider";
import CustomFlow from "./custom-flow/CustomFlow";

export default function CustomFlowPage() {
  const router = useRouter();
  const [isFrontend, setIsFrontend] = useState(true);

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
          setIsFrontend={setIsFrontend}
          toggleFrontend={toggleFrontend}
        />
      </NodeConnectionProvider>
    </PipelineProvider>
  );
}
