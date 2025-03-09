"use client";
import {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  addEdge,
  BackgroundVariant,
  ReactFlowProvider,
} from "@xyflow/react";
import { useCallback, useEffect, useRef } from "react";
import { ReactFlow, Background } from "@xyflow/react";
import { useNodeConnectionContext } from "../context/NodeConnectionProvider";
import TopMenu from "./TopMenu";
import ImageNode from "./nodes/ImageNode";
import TextNode from "./nodes/TextNode";
import AIModelNode from "./nodes/AIModelNode";
import ButtonNode from "./nodes/ButtonNode";
import HeaderNode from "./nodes/HeaderNode";
import AudioNode from "./nodes/AudioNode";
import FileDropNode from "./nodes/FileDropNode";
import { generateId } from "./utils";

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
  setIsFrontend,
}: {
  isFrontend: boolean;
  navigateHome: () => void;
  toggleFrontend: () => void;
  setIsFrontend: (isFrontend: boolean) => void;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const nodeTypes = {
    imagebox: ImageNode,
    textbox: TextNode,
    llm: AIModelNode,
    button: ButtonNode,
    header: HeaderNode,
    audiobox: AudioNode,
    audiogen: AIModelNode,
    imagegen: AIModelNode,
    filebox: FileDropNode,
    fileparser: AIModelNode,
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "llm") {
          return {
            ...node,
            style: {
              ...(node.style || {}),
              display: isFrontend ? "none" : "block",
              pointerEvents: isFrontend ? "none" : "auto",
            },
          };
        }
        if (node.type === "audiogen") {
          return {
            ...node,
            style: {
              ...(node.style || {}),
              display: isFrontend ? "none" : "block",
              pointerEvents: isFrontend ? "none" : "auto",
            },
          };
        }
        if (node.type === "imagegen") {
          return {
            ...node,
            style: {
              ...(node.style || {}),
              display: isFrontend ? "none" : "block",
              pointerEvents: isFrontend ? "none" : "auto",
            },
          };
        }
        if (node.type === "fileparser") {
          return {
            ...node,
            style: {
              ...(node.style || {}),
              display: isFrontend ? "none" : "block",
              pointerEvents: isFrontend ? "none" : "auto",
            },
          };
        }
        if (node.type === "imagebox") {
          return { ...node, data: { ...node.data, isFrontend } };
        }
        if (node.type === "textbox") {
          return { ...node, data: { ...node.data, isFrontend } };
        }
        if (node.type === "button") {
          return { ...node, data: { ...node.data, isFrontend } };
        }
        if (node.type === "audiobox") {
          return { ...node, data: { ...node.data, isFrontend } };
        }
        if (node.type === "filebox") {
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

  const addNewNode = (nodeType: string, position: any) => {
    const newId = generateId();

    let newData: any = {};
    if (nodeType === "textbox") {
      newData = { isFrontend: isFrontend, id: newId };
    } else if (nodeType === "button") {
      newData = { isFrontend: isFrontend, id: newId };
    } else if (nodeType === "llm") {
      setIsFrontend(false);
      newData = { type: "text", id: newId };
    } else if (nodeType === "fileparser") {
      setIsFrontend(false);
      newData = { type: "file", id: newId };
    } else if (nodeType === "audiogen") {
      setIsFrontend(false);
      newData = { type: "audio", id: newId };
    } else if (nodeType === "imagebox") {
      newData = { isFrontend: isFrontend, id: newId };
    } else if (nodeType === "audiobox") {
      newData = { isFrontend: isFrontend, id: newId };
    } else if (nodeType === "filebox") {
      newData = { isFrontend: isFrontend, id: newId };
    } else if (nodeType === "imagegen") {
      setIsFrontend(false);
      newData = { type: "image", id: newId };
    } else {
      newData = { id: newId };
    }

    const newNode: Node = {
      id: newId,
      type: nodeType,
      position: position,
      data: newData,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const reactFlowWrapper = useRef(null);

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <TopMenu
          isFrontend={isFrontend}
          toggleFrontend={toggleFrontend}
          name="Untitled"
          setName={setName}
          addNewNode={addNewNode}
          reactFlowWrapper={reactFlowWrapper}
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
      </ReactFlowProvider>
    </div>
  );
}
