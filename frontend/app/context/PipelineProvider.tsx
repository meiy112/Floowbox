"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Pipeline, PipelineNode } from "../class/Pipeline";

interface PipelineContextType {
  createPipeline: (key: string) => Pipeline;
  callPipelines: (keys: string[], input?: any) => void;
  pipelines: { [key: string]: Pipeline };
  updateFlag: number;
  triggerUpdate: () => void;
  defaultFlowId: string;
}

const PipelineContext = createContext<PipelineContextType | undefined>(
  undefined
);

export const PipelineProvider = ({ children }: { children: ReactNode }) => {
  const [updateFlag, setUpdateFlag] = useState(0);

  const defaultFlowId = "flow1";
  const [pipelines, setPipelines] = useState<{ [key: string]: Pipeline }>({
    [defaultFlowId]: new Pipeline(defaultFlowId),
  });

  const triggerUpdate = () => {
    setUpdateFlag((prev) => prev + 1);
  };

  const createPipeline = (key: string): Pipeline => {
    if (pipelines[key]) {
      return pipelines[key];
    }
    const newPipeline = new Pipeline(key);
    setPipelines((prev) => ({
      ...prev,
      [key]: newPipeline,
    }));
    return newPipeline;
  };

  const callPipelines = async (keys: string[], input?: any) => {
    for (const key of keys) {
      if (pipelines[key]) {
        await pipelines[key].execute(input);
      }
    }
  };

  return (
    <PipelineContext.Provider
      value={{
        createPipeline,
        callPipelines,
        pipelines,
        updateFlag,
        triggerUpdate,
        defaultFlowId,
      }}
    >
      {children}
    </PipelineContext.Provider>
  );
};

export const usePipelineContext = () => {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error(
      "usePipelineContext must be used within a PipelineProvider"
    );
  }
  return context;
};
