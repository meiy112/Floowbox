"use client";
import {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  addEdge,
  BackgroundVariant,
} from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { ReactFlow, Background } from "@xyflow/react";

interface ConnectionParams {
  source: string;
  sourceHandle: string | null;
  target: string;
  targetHandle: string | null;
}

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

export default function CustomFlow({
  isFrontend,
  navigateHome,
  toggleFrontend,
}: {
  isFrontend: boolean;
  navigateHome: () => void;
  toggleFrontend: () => void;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const nodeTypes = {};

  const onConnect = useCallback(
    (params: ConnectionParams) => {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setEdges]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={isFrontend ? [] : edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultViewport={defaultViewport}
        fitView
        style={{ backgroundColor: "white" }}
        attributionPosition="bottom-left"
      >
        <Background
          color="#BCBCD0"
          variant={BackgroundVariant.Dots}
          gap={25}
          size={2}
        />
      </ReactFlow>
    </div>
  );
}
