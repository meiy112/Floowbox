"use client";
import { useState } from "react";
import {
  ChevronUp,
  Plus,
  Type,
  Image,
  AudioLines,
  Heading,
  Upload,
  MessagesSquare,
  BotMessageSquare,
  Palette,
  FileAudio,
  BookOpen,
} from "lucide-react";
import Divider from "@/app/components/divider/Divider";
import "./TopMenu.css";

type ComponentMenuProps = {
  addNewNode: (nodeType: string, position: any) => void;
  centerFlowPosition: any;
};

const TooltipButton = ({
  tooltip,
  nodeType,
  onClick,
  children,
}: {
  tooltip: string;
  nodeType: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group inline-block">
      <button className="component-menu__button--component" onClick={onClick}>
        {children}
      </button>
      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {tooltip}
      </div>
    </div>
  );
};

const ComponentMenu = ({
  addNewNode,
  centerFlowPosition,
}: ComponentMenuProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      {expand ? (
        <div className="top-menu__component-menu flex flex-col gap-y-[0.5em] items-center justify-between py-[0.6em]">
          <button
            className="component-menu__button--collapse"
            onClick={() => setExpand(false)}
          >
            <ChevronUp size={22} strokeWidth={1.65} />
          </button>
          <Divider isHorizontal={true} width={2.5} />
          <div className="component-menu__section">
            <TooltipButton
              nodeType="textbox"
              tooltip="Text Box"
              onClick={() => addNewNode("textbox", centerFlowPosition)}
            >
              <Type size={22} strokeWidth={1.65} />
            </TooltipButton>
            <TooltipButton
              nodeType="imagebox"
              tooltip="Image Box"
              onClick={() => addNewNode("imagebox", centerFlowPosition)}
            >
              <Image size={22} strokeWidth={1.65} />
            </TooltipButton>
            <TooltipButton
              nodeType="audiobox"
              tooltip="Audio Box"
              onClick={() => addNewNode("audiobox", centerFlowPosition)}
            >
              <AudioLines size={22} strokeWidth={1.65} />
            </TooltipButton>
            <TooltipButton
              nodeType="header"
              tooltip="Header"
              onClick={() => addNewNode("header", centerFlowPosition)}
            >
              <Heading size={22} strokeWidth={1.65} />
            </TooltipButton>
            <TooltipButton
              nodeType="filebox"
              tooltip="File Box"
              onClick={() => addNewNode("filebox", centerFlowPosition)}
            >
              <Upload size={22} strokeWidth={1.65} />
            </TooltipButton>
            <TooltipButton
              nodeType="chatbox"
              tooltip="Chat Box"
              onClick={() => addNewNode("chatbox", centerFlowPosition)}
            >
              <MessagesSquare size={22} strokeWidth={1.65} />
            </TooltipButton>
          </div>
          <Divider isHorizontal={true} width={2.5} />
          <div className="component-menu__section">
            <TooltipButton
              nodeType="llm"
              tooltip="Text AI"
              onClick={() => addNewNode("llm", centerFlowPosition)}
            >
              <BotMessageSquare size={22} strokeWidth={1.65} />
            </TooltipButton>
            <TooltipButton
              nodeType="imagegen"
              tooltip="Image AI"
              onClick={() => addNewNode("imagegen", centerFlowPosition)}
            >
              <Palette size={22} strokeWidth={1.65} />
            </TooltipButton>
            <TooltipButton
              nodeType="audiogen"
              tooltip="Audio AI"
              onClick={() => addNewNode("audiogen", centerFlowPosition)}
            >
              <FileAudio size={22} strokeWidth={1.65} />
            </TooltipButton>
            <TooltipButton
              nodeType="fileparser"
              tooltip="File Parser"
              onClick={() => addNewNode("fileparser", centerFlowPosition)}
            >
              <BookOpen size={22} strokeWidth={1.65} />
            </TooltipButton>
          </div>
        </div>
      ) : (
        <div className="top-menu__component-menu flex items-center justify-center">
          <button
            onClick={() => setExpand(true)}
            className="component-menu__button"
          >
            <Plus size={22} strokeWidth={1.65} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ComponentMenu;
