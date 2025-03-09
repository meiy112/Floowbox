"use client";
import { AnimatePresence, motion } from "framer-motion";
import BackendBox from "./BackendBox";
import "./ImageBox.css";
import React, { useEffect } from "react";
import { PipelineNode } from "@/app/class/Pipeline";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";

type ImageBoxNodeProps = {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
};

const ImageBoxNode = ({ data, isConnectable, id }: ImageBoxNodeProps) => {
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "ImageSummarizer",
    process: async (input: any) => {
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
    <motion.div
      layoutId="image-box-container"
      className="bg-white image-box__frontend-container image-box h-[450px]"
    >
      <motion.div
        layoutId="image-box"
        className="image-box__frontend rounded-[15px] overflow-hidden flex flex-col items-center justify-center h-full bg-[#F7F7F9]"
      >
        <img
          src="/image-placeholder.svg"
          alt="Icon"
          className="w-[60px] h-[60px]"
        />
        <div style={{ color: "#ceccd7" }}>When an image is ready, it will</div>
        <div style={{ color: "#ceccd7" }}>appear here.</div>
      </motion.div>
    </motion.div>
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
    <motion.div
      layoutId="image-box-container"
      className="image-box__backend-container image-box h-[450px] flex items-center justify-center"
    >
      <BackendBox type="image" isConnectable={isConnectable} id={id} />
    </motion.div>
  );
};

export default ImageBoxNode;
