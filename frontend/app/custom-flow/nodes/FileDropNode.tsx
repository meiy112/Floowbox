"use client";
import { AnimatePresence } from "framer-motion";
import "./FileDropNode.css";
import React, { useEffect, useRef, useState } from "react";
import { PipelineNode } from "@/app/class/Pipeline";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import BackendBox from "@/app/components/boxes/BackendBox";
import { CircleX, CloudUpload, Upload } from "lucide-react";

type FileDropBoxNodeProps = {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
};

const FileDropNode = ({ data, isConnectable, id }: FileDropBoxNodeProps) => {
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();
  const [fileBlob, setFileDropBlob] = useState<Blob | null>(null);
  const [frontendHeight, setFrontendHeight] = useState<number | null>(null);

  const fileRef = useRef(fileBlob);

  useEffect(() => {
    fileRef.current = fileBlob;
  }, [fileBlob]);

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "file",
    process: async () => {
      return fileRef.current;
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, [id, registerNode, nodeDefinition]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ zIndex: 5 }}
    >
      <AnimatePresence>
        <div className="h-full">
          {isFrontend ? (
            <FrontendFileDropBox
              onFileSelected={setFileDropBlob}
              setHeight={setFrontendHeight}
            />
          ) : (
            <BackendFileDropBox
              isConnectable={isConnectable}
              id={id}
              height={frontendHeight}
            />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

type FrontendFileDropBoxProps = {
  onFileSelected: (file: Blob | null) => void;
  setHeight: (height: number) => void;
};

const FrontendFileDropBox = ({
  onFileSelected,
  setHeight,
}: FrontendFileDropBoxProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelected(null);
  };

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.clientHeight);
    }
  }, [setHeight, selectedFile]);

  return (
    <div
      ref={containerRef}
      className="py-[1.1em] overflow-hidden bg-white flex flex-col justify-between file-box__frontend-container file-box h-full w-[450px] rounded-[20px]"
    >
      <div className="flex px-[1.3em] items-center gap-x-[1em]">
        <div className="border-1 border-[var(--border)] rounded-[20em] aspect-square w-[42px] flex items-center justify-center">
          <Upload size={18} />
        </div>
        <div>
          <div className="text-[1rem] font-medium">Upload Files</div>
          <div className="text-[#CECCD7]">
            Select and upload the files of your choice.
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[var(--border)] mt-[1em] mb-[1.2em]" />
      <label className="h-[13em] px-[1.3em]">
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setSelectedFile(file);
              onFileSelected(file);
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
          <span>Choose a file or drag & drop it here.</span>
          <span className="mt-[1em] mb-[1em] text-[var(--primary)] text-[0.8rem] rounded-[50em] border-1 border-[var(--primary)] px-[0.7em]">
            or browse
          </span>
        </div>
      </label>
      {selectedFile && (
        <div className="flex px-[1.3em] items-center gap-x-[1em] mt-[0.7em] w-full">
          <div className="w-full bg-[#EEF1F7] rounded-[15px] h-[5em] px-[1.2em] flex items-center justify-between">
            <div className="gap-x-[1em] flex items-center">
              <img src="images/pdf.svg" alt="" className="h-[3em]" />
              <div>
                <div>
                  {selectedFile ? selectedFile.name : "File name goes here"}
                </div>
                <div
                  className="text-[0.8rem]"
                  style={{ color: "rgba(0, 0, 0, 0.3)" }}
                >
                  {selectedFile
                    ? formatFileSize(selectedFile.size)
                    : "File size goes here"}
                </div>
              </div>
            </div>
            <button
              className="h-full flex py-[1.1em] cursor-pointer"
              style={{ color: "rgba(0, 0, 0, 0.5)" }}
              onClick={removeFile}
            >
              <CircleX size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

type BackendFileDropBoxProps = {
  isConnectable: boolean;
  id: string;
  height: number | null;
};

const BackendFileDropBox = ({
  isConnectable,
  id,
  height,
}: BackendFileDropBoxProps) => {
  return (
    <div
      className="file-box__backend-container rounded-[20px] file-box flex items-center justify-center w-[450px]"
      style={{ height: height ? `${height}px` : "18em" }}
    >
      <BackendBox type="file" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default FileDropNode;
