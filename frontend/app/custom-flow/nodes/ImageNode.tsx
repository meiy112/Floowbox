"use client";
import { AnimatePresence, motion } from "framer-motion";
import "./ImageNode.css";
import React, { useEffect, useState } from "react";
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
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "image",
    process: async (input: any) => {
      setImageSrc(input);
      return input;
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, [id, registerNode, nodeDefinition]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "380px", zIndex: 5 }}
    >
      <div className={isFrontend ? "" : "invisible"}>
        <FrontendImageBox imageSrc={imageSrc} />
      </div>
      <BackendImageBox
        isConnectable={isConnectable}
        id={id}
        hidden={isFrontend}
      />
    </div>
  );
};

const FrontendImageBox = ({ imageSrc }: { imageSrc: string | null }) => {
  return (
    <div className="bg-white image-box__frontend-container image-box h-[380px]">
      {imageSrc ? (
        <div className="gap-y-[0.8em] image-box__frontend rounded-[15px] overflow-hidden flex flex-col items-center justify-center h-full">
          <img src={imageSrc} />
        </div>
      ) : (
        <div className="gap-y-[0.8em] image-box__frontend rounded-[15px] overflow-hidden flex flex-col items-center justify-center h-full bg-[#F7F7F9]">
          <Image size={70} color={"#CECCD7"} opacity={0.5} strokeWidth={1.3} />
          <div className="flex items-center justify-center flex-col">
            <div style={{ color: "#ceccd7" }}>
              When an image is ready, it will
            </div>
            <div className="mt-[-0.2em]" style={{ color: "#ceccd7" }}>
              appear here.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BackendImageBox = ({
  isConnectable,
  id,
  hidden,
}: {
  isConnectable: boolean;
  id: string;
  hidden: boolean;
}) => {
  return (
    <div
      className="absolute inset-0 image-box__backend-container image-box h-[380px] flex items-center justify-center"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <BackendBox type="image" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default ImageNode;
