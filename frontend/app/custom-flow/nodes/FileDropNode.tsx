"use client";
import { AnimatePresence } from "framer-motion";
import "./FileDropNode.css";
import React, { useEffect, useState } from "react";
import { PipelineNode } from "@/app/class/Pipeline";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import BackendBox from "@/app/components/boxes/BackendBox";
import WavesurferPlayer from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js";
import { CloudUpload } from "lucide-react";

type FileDropBoxNodeProps = {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
};

const FileDropNode = ({ data, isConnectable, id }: FileDropBoxNodeProps) => {
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();

  const [audioBlob, setFileDropBlob] = useState(null);

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "audio",
    process: async (input: any) => {
      console.log("FileDrop box processing. Input:", input);
      setFileDropBlob(input);
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, [id, registerNode, nodeDefinition]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "13em", zIndex: 5 }}
    >
      <AnimatePresence>
        <div className="h-full">
          {isFrontend ? (
            <FrontendFileDropBox />
          ) : (
            <BackendFileDropBox isConnectable={isConnectable} id={id} />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

const FrontendFileDropBox = () => {
  return (
    <div className="bg-white file-box__frontend-container file-box h-full w-[450px] rounded-[20px]">
      <div className="cursor-pointer px-[1.7em] file-box__frontend rounded-[15px] overflow-hidden flex flex-col items-center justify-center h-full">
        <CloudUpload
          size={70}
          color={"#CECCD7"}
          opacity={0.5}
          strokeWidth={1.3}
        />
        <span className="text-[1rem] font-medium">Drag & drop to upload</span>
        <span className="text-[var(--primary)]">or browse</span>
      </div>
    </div>
  );
};

const BackendFileDropBox = ({
  isConnectable,
  id,
}: {
  isConnectable: boolean;
  id: string;
}) => {
  return (
    <div className="file-box__backend-container rounded-[20px] file-box h-full flex items-center justify-center w-[450px]">
      <BackendBox type="file" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default FileDropNode;
