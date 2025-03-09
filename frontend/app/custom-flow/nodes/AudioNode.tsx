"use client";
import { AnimatePresence } from "framer-motion";
import "./AudioNode.css";
import React, { useEffect } from "react";
import { PipelineNode } from "@/app/class/Pipeline";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import BackendBox from "@/app/components/boxes/BackendBox";

type AudioBoxNodeProps = {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
};

const AudioNode = ({ data, isConnectable, id }: AudioBoxNodeProps) => {
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "audio",
    process: async (input: any) => {
      console.log("Audio box processing. Input:", input);
      return input;
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, [id, registerNode, nodeDefinition]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "450px", zIndex: 5 }}
    >
      <AnimatePresence>
        <div>
          {isFrontend ? (
            <FrontendAudioBox />
          ) : (
            <BackendAudioBox isConnectable={isConnectable} id={id} />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

const FrontendAudioBox = () => {
  return (
    <div className="bg-white audio-box__frontend-container audio-box h-[380px]">
      <div className="gap-y-[0.8em] image-box__frontend rounded-[15px] overflow-hidden flex flex-col items-center justify-center h-full bg-[#F7F7F9]">
        <div className="flex items-center justify-center flex-col">
          <div style={{ color: "#ceccd7" }}>
            When an image is ready, it will
          </div>
          <div className="mt-[-0.2em]" style={{ color: "#ceccd7" }}>
            appear here.
          </div>
        </div>
      </div>
    </div>
  );
};

const BackendAudioBox = ({
  isConnectable,
  id,
}: {
  isConnectable: boolean;
  id: string;
}) => {
  return (
    <div className="audio-box__backend-container audio-box h-[380px] flex items-center justify-center">
      <BackendBox type="image" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default AudioNode;
