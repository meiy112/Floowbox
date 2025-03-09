"use client";
import React, { useEffect, useState } from "react";
import "./ButtonNode.css";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import { PipelineNode } from "@/app/class/Pipeline";
import NodeHandleWrapper from "@/app/components/NodeHandleWrapper";

type ButtonNodeProps = {
  data: {
    isFrontend: boolean;
    id: string;
  };
  isConnectable: boolean;
};

const ButtonNode = ({ data, isConnectable }: ButtonNodeProps) => {
  const { isFrontend, id } = data;

  const { currentPipeline, registerNode } = useNodeConnectionContext();

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "button",
    process: async () => {
      console.log("Button pressed, running pipeline");
      return;
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, []);

  const onClick = async () => {
    if (!currentPipeline) {
      console.log("Pipeline 'pipeline1' not found.");
      return;
    }
    try {
      await currentPipeline.execute("someInput", [id]);
    } catch (error) {
      console.log("Error executing pipeline:", error);
    }
  };

  return (
    <NodeHandleWrapper
      isFrontend={isFrontend}
      id={id}
      type={"text"}
      isConnectable={isConnectable}
    >
      <button
        onClick={onClick}
        className="text-white text-[1.05rem] button-node h-[3em] px-[1.9em] rounded-[50em]"
      >
        Click Me
      </button>
    </NodeHandleWrapper>
  );
};

export default ButtonNode;
