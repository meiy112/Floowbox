import React, { createContext, useContext, useState, ReactNode } from "react";
import { usePipelineContext } from "./PipelineProvider";
import { Pipeline, PipelineNode } from "../class/Pipeline";

interface Connection {
  pipelineId: string;
  inputId: string;
  outputId: string;
}

interface ConnectionContextType {
  connections: Connection[];
  createConnection: (inputId: string, outputId: string) => void;
  registerNode: (nodeDefinition: PipelineNode) => void;
  currentPipeline: Pipeline;
  removeConnection: (inputId: string, outputId: string) => void;
}

const NodeConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined
);

export const NodeConnectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const { pipelines, triggerUpdate, defaultFlowId, callPipelines } =
    usePipelineContext();

  const currentPipeline = pipelines[defaultFlowId];

  const createConnection = (inputId: string, outputId: string) => {
    const pipeline = pipelines[defaultFlowId];
    if (!pipeline) {
      console.error(`Flow graph '${defaultFlowId}' does not exist.`);
      return;
    }

    pipeline.addEdge({
      id: `edge_${inputId}_${outputId}`,
      from: { nodeId: inputId },
      to: { nodeId: outputId },
    });
    triggerUpdate();
    setConnections((prev) => [
      ...prev,
      { pipelineId: defaultFlowId, inputId, outputId },
    ]);
  };

  const registerNode = (nodeDefinition: PipelineNode) => {
    const pipeline = pipelines[defaultFlowId];
    if (!pipeline) {
      console.error(`Flow graph '${defaultFlowId}' does not exist.`);
      return;
    }

    if (!pipeline.nodes[nodeDefinition.id]) {
      pipeline.addNode(nodeDefinition);
    }
  };

  const removeConnection = (inputId: string, outputId: string) => {
    const edgeId = `edge_${inputId}_${outputId}`;
    const pipeline = pipelines[defaultFlowId];
    if (!pipeline) {
      console.error(`Flow graph '${defaultFlowId}' does not exist.`);
      return;
    }
    pipeline.removeEdge(edgeId);
    triggerUpdate();
    setConnections((prev) =>
      prev.filter(
        (conn) => !(conn.inputId === inputId && conn.outputId === outputId)
      )
    );
  };

  return (
    <NodeConnectionContext.Provider
      value={{
        connections,
        createConnection,
        registerNode,
        currentPipeline,
        removeConnection,
      }}
    >
      {children}
    </NodeConnectionContext.Provider>
  );
};

export const useNodeConnectionContext = () => {
  const context = useContext(NodeConnectionContext);
  if (!context) {
    throw new Error(
      "useConnectionContext must be used within a ConnectionProvider"
    );
  }
  return context;
};
