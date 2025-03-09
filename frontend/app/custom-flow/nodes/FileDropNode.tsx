"use client";
import { AnimatePresence } from "framer-motion";
import "./FileDropNode.css";
import React, { useEffect, useState } from "react";
import { PipelineNode } from "@/app/class/Pipeline";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import BackendBox from "@/app/components/boxes/BackendBox";
import { CloudUpload, Upload } from "lucide-react";
import Divider from "@/app/components/divider/Divider";

type FileDropBoxNodeProps = {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
};

const FileDropNode = ({ data, isConnectable, id }: FileDropBoxNodeProps) => {
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();
  const [fileBlob, setFileDropBlob] = useState<Blob | null>(null);

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "file",
    process: async () => {
      return fileBlob;
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, [id, registerNode, nodeDefinition]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "18em", zIndex: 5 }}
    >
      <AnimatePresence>
        <div className="h-full">
          {isFrontend ? (
            <FrontendFileDropBox onFileSelected={setFileDropBlob} />
          ) : (
            <BackendFileDropBox isConnectable={isConnectable} id={id} />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

const FrontendFileDropBox = ({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void;
}) => {
  return (
    <div className="py-[1.1em] overflow-hidden bg-white flex flex-col justify-between file-box__frontend-container file-box h-full w-[450px] rounded-[20px]">
      <div className="flex px-[1.3em] items-center gap-x-[1em]">
        <div className="border-1 border-[var(--border)] rounded-[20em] aspect-square w-[42px] flex items-center justify-center">
          <Upload size={18} />
        </div>
        <div className="">
          <div className="text-[1rem] font-medium">Upload Files</div>
          <div className="text-[#CECCD7]">
            Select and upload the files of your choice.
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[var(--border)] mt-[1em] mb-[1.2em]" />
      <label className="flex-1 px-[1.3em]">
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileSelected(e.target.files[0]);
            }
          }}
        />
        <div className="h-full cursor-pointer px-[1.7em] file-box__frontend rounded-[15px] overflow-hidden flex flex-col items-center justify-center">
          <CloudUpload
            size={70}
            color={"#CECCD7"}
            opacity={0.5}
            strokeWidth={1.3}
          />
          <span className="">Choose a file or drag & drop it here.</span>
          <span className="mt-[1em] mb-[1em] text-[var(--primary)] text-[0.8rem] rounded-[50em] border-1 border-[var(--primary)] px-[0.7em]">
            or browse
          </span>
        </div>
      </label>
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
