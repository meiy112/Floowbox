"use client";
import { AnimatePresence, motion } from "framer-motion";
import "./ImageNode.css";
import React, { useEffect } from "react";
import { PipelineNode } from "@/app/class/Pipeline";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import BackendBox from "@/app/components/boxes/BackendBox";
import { Image } from "lucide-react";

type ImageBoxNodeProps = {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
};

const ImageNode = ({ data, isConnectable, id }: ImageBoxNodeProps) => {
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "ImageSummarizer",
    process: async (input: any) => {
      console.log("ImageBox processing. Input:", input);
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
            <FrontendImageBox />
          ) : (
            <BackendImageBox isConnectable={isConnectable} id={id} />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

const FrontendImageBox = () => {
  return (
    <div className="bg-white image-box__frontend-container image-box h-[380px]">
      <div className="gap-y-[1em] image-box__frontend rounded-[15px] overflow-hidden flex flex-col items-center justify-center h-full bg-[#F7F7F9]">
        <Image size={60} color={"#CECCD7"} opacity={0.5} strokeWidth={1.5} />
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

const BackendImageBox = ({
  isConnectable,
  id,
}: {
  isConnectable: boolean;
  id: string;
}) => {
  return (
    <div className="image-box__backend-container image-box h-[380px] flex items-center justify-center">
      <BackendBox type="image" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default ImageNode;
