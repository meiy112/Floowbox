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
import { useNodeConnectionContext } from "../context/NodeConnectionProvider";
import TopMenu from "./TopMenu";

interface ConnectionParams {
  source: string;
  sourceHandle: string | null;
  target: string;
  targetHandle: string | null;
}

const defaultViewport = { x: 0, y: 0, zoom: 1 };

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

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "image") {
          return { ...node, data: { ...node.data, isFrontend } };
        }
        return node;
      })
    );
  }, [isFrontend, setNodes]);

  const { createConnection } = useNodeConnectionContext();

  const onConnect = useCallback(
    (params: ConnectionParams) => {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
      createConnection(params.source, params.target);
    },
    [setEdges]
  );

  const setName = (name: string) => {
    console.log("hi");
  };

  const addNewNode = (nodeType: string, id: string) => {
    let newData: any = {};
    if (nodeType === "textbox") {
      newData = { isFrontend: isFrontend, id };
    } else if (nodeType === "button") {
      newData = { type: "text", id };
    } else if (nodeType === "aimodel") {
      newData = { type: "text", id };
    } else {
      newData = { id };
    }

    const defaultPosition = {
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 600),
    };

    const newNode: Node = {
      id,
      type: nodeType,
      position: defaultPosition,
      data: newData,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <div className="h-full w-full">
      <TopMenu
        isFrontend={isFrontend}
        toggleFrontend={toggleFrontend}
        name="Untitled"
        setName={setName}
        addNewNode={addNewNode}
      />
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
