"use client";
import { modelApi } from "@/app/api/modelApi";
import { parseApi } from "@/app/api/parseApi"
import { PipelineNode } from "@/app/class/Pipeline";
import AIModel from "@/app/components/models/AIModel";
import { ModelType } from "@/app/components/models/utils";
import NodeHandleWrapper from "@/app/components/NodeHandleWrapper";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import React, { useEffect, useRef, useState } from "react";

type AIModelNodeProps = {
  data: {
    id: string;
    type: string;
  };
  isConnectable: boolean;
};

const AIModelNode = ({ data, isConnectable }: AIModelNodeProps) => {
  const defaultModels = {
    text: "GPT o3-mini",
    image: "Midjourney",
    audio: "TTS (text-to-speech)",
    file: "PDF",
  };

  const { id, type } = data;

  const [model, setModel] = useState(defaultModels[type as ModelType]);
  const [context, setContext] = useState("");

  const contextRef = useRef(context);
  const modelRef = useRef(model);

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  useEffect(() => {
    modelRef.current = model;
  }, [model]);

  const { registerNode } = useNodeConnectionContext();

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "GptModel",
    process: async (input: any) => {
      if (type === "file") {
        console.log("parsing pdf...");
        const result = await parseApi.parsePdf(input);
        return result;
      } else {
        const options = {
          voice: "shimmer",
        }; // TODO: add options if they are selected
        const result = await modelApi.generate(
          model,
          "text",
          type,
          input,
          options
        );
        return result;
      }
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, []);

  return (
    <div className="text-[0.9rem] relative flex items-center justify-center ai-model-node">
      <NodeHandleWrapper id={id} type={type} isConnectable={isConnectable}>
        <AIModel
          type={type}
          model={model}
          context={context}
          setModel={setModel}
          setContext={setContext}
        />
      </NodeHandleWrapper>
    </div>
  );
};

export default AIModelNode;
