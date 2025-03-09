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
    audio: "TTS-1",
    file: "PDF",
  };

  const { id, type } = data;

  const [model, setModel] = useState(defaultModels[type as ModelType]);
  const [context, setContext] = useState("");
  const [temperature, setTemperature] = useState(0.5);
  const [prompt, setPrompt] = useState("");
  const [maxLength, setMaxLength] = useState(200);
  const [negativePrompt, setNegativePrompt] = useState("")
  const [speed, setSpeed] = useState(0.5)
  const [voice, setVoice] = useState("alloy")

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
          context: contextRef.current,
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
          temperature={temperature}
          setTemperature={setTemperature}
          prompt={prompt}
          setPrompt={setPrompt}
          maxLength={maxLength}
          setMaxLength={setMaxLength}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
          speed={speed}
          setSpeed={setSpeed}
          voice={voice}
          setVoice={setVoice}
        />
      </NodeHandleWrapper>
    </div>
  );
};

export default AIModelNode;
