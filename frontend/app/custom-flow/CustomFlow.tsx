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
import { useCallback, useEffect, useRef, useState } from "react";
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
import { extractConnectionIds, generateId } from "./utils";
import ChatNode from "./nodes/ChatNode";
import { Ghost } from "lucide-react";

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
  const [isRunning, setIsRunning] = useState(false);

  const toggleIsRunning = () => {
    if (!isRunning) {
      setIsFrontend(true);
    }
    setIsRunning((prev) => !prev);
  };

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
    chatbox: ChatNode,
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
        if (node.type === "chatbox") {
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

  const { createConnection, removeConnection } = useNodeConnectionContext();

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
    } else if (nodeType === "chatbox") {
      newData = { isFrontend: isFrontend, id: newId };
    } else {
      newData = { id: newId };
    }

    const newNode: Node = {
      id: newId,
      type: nodeType,
      position: position,
      data: newData,
    };

    setNodes((prevNodes) => {
      const newNodes = [...prevNodes, newNode];
      newNodes.sort((a, b) => {
        const getOrder = (node: Node) => {
          if (
            node.type &&
            ["llm", "audiogen", "imagegen", "fileparser"].includes(node.type)
          )
            return 2;
          if (node.type === "button") return 1;
          return 0;
        };
        return getOrder(a) - getOrder(b);
      });
      return newNodes;
    });
  };

  const reactFlowWrapper = useRef(null);

  const handleEdgesChange = useCallback(
    (changes: any) => {
      onEdgesChange(changes);
      changes.forEach((change: any) => {
        if (change.type === "remove") {
          const removedEdgeId = change.id;
          const ids = extractConnectionIds(removedEdgeId);
          if (ids) {
            removeConnection(ids.inputId, ids.outputId);
          } else {
            console.warn(
              "Could not extract connection ids from:",
              removedEdgeId
            );
          }
        }
      });
    },
    [onEdgesChange, removeConnection]
  );

  return (
    <div
      className="h-full w-full"
      ref={reactFlowWrapper}
      style={isRunning ? { pointerEvents: "none" } : {}}
    >
      <ReactFlowProvider>
        <TopMenu
          isFrontend={isFrontend}
          toggleFrontend={toggleFrontend}
          name="Custom Flow"
          setName={setName}
          addNewNode={addNewNode}
          reactFlowWrapper={reactFlowWrapper}
          toggleIsRunning={toggleIsRunning}
          isRunning={isRunning}
        />
        <ReactFlow
          nodes={nodes}
          edges={isFrontend ? [] : edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          defaultViewport={defaultViewport}
          fitView
          style={{ backgroundColor: "white" }}
          attributionPosition="bottom-left"
          nodesDraggable={!isRunning}
          nodesConnectable={!isRunning}
          panOnScroll={!isRunning}
          zoomOnScroll={!isRunning}
          zoomOnPinch={!isRunning}
        >
          {!isRunning && (
            <Background
              color="#CCCCCC"
              variant={BackgroundVariant.Dots}
              gap={25}
              size={2}
            />
          )}
          {nodes.length === 0 && (
            <div className="absolute inset-0 pb-[0em] flex flex-col items-center justify-center pointer-events-none">
              {/* <div className="border-1 border-[var(--border)] bg-white rounded-[15px] gap-y-[1em] w-[23em] h-[16em] flex flex-col items-center justify-center">
                <Ghost size={100} strokeWidth={1.5} color={"#FAFAFC"} />
                <div className="text-center text-[0.85rem] w-[15em] text-[#CECCD7]">
                  This is the floow page, it is empty now. Find the + icon at
                  the top left to add nodes.
                </div>
              </div> */}
              <div className="flex">
                <span className="font-bold text-[var(--primary)] text-[4em]">
                  Floow
                </span>
                <span className="font-bold text-[4em]">Box</span>
              </div>
              <div
                className="text-center text-[0.85rem] w-[18em] text-black bg-white rounded-[15px]"
                style={{ color: "rgba(0, 0, 0, 0.5" }}
              >
                This is the floow page, it is empty now. Find the + icon at the
                top left to add nodes.
              </div>
            </div>
          )}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
