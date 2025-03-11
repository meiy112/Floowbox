import {
  AudioLines,
  BookOpen,
  BotMessageSquare,
  ChevronUp,
  CodeXml,
  FileAudio,
  Heading,
  House,
  Image,
  Link,
  MessagesSquare,
  MoveLeft,
  Palette,
  PencilLine,
  Play,
  Plus,
  Type,
  Upload,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";
import "./TopMenu.css";
import { motion } from "framer-motion";
import Divider from "../components/divider/Divider";
import { useEffect, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import ComponentMenu from "./ComponentMenu";

const TopMenu = ({
  isFrontend,
  toggleFrontend,
  name,
  setName,
  addNewNode,
  reactFlowWrapper,
  toggleIsRunning,
  isRunning,
}: {
  isFrontend: boolean;
  toggleFrontend: () => void;
  name: string;
  setName: (name: string) => void;
  addNewNode: (nodeType: string, position: any) => void;
  reactFlowWrapper: any;
  toggleIsRunning: () => void;
  isRunning: boolean;
}) => {
  const reactFlowInstance = useReactFlow();
  const [centerFlowPosition, setCenterFlowPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (reactFlowWrapper.current && reactFlowInstance) {
      const { width, height } =
        reactFlowWrapper.current.getBoundingClientRect();
      const viewport = reactFlowInstance.getViewport();
      const centerFlowX = (-viewport.x + width / 2) / viewport.zoom;
      const centerFlowY = (-viewport.y + height / 2) / viewport.zoom;
      setCenterFlowPosition({ x: centerFlowX, y: centerFlowY });
    }
  }, [reactFlowInstance]);

  return (
    <div className="pointer-events-none absolute text-black z-10 py-[1em] px-[1.4em] text-[0.9em] flex flex-col w-full gap-y-[1em]">
      <div className="select-none items-center justify-between flex w-full">
        {!isRunning && (
          <div className="floating-menu flex justify-center items-center">
            <TopMenuButton icon={<House size={22} strokeWidth={1.65} />} />
            <span className="flex items-center align-center gap-x-[0.8em] mx-[0.2em]">
              <span className="text-[1.05rem] cursor-pointer font-medium">
                {name}
              </span>
              <button className="top-menu__name-button">
                <PencilLine size={16} />
              </button>
              <button className="top-menu__name-button">
                <Link size={16} />
              </button>
              <button className="top-menu__name-button">
                <UsersRound size={16} />
              </button>
            </span>
            <Divider height={2.5} />
            <FrontendToggle
              isFrontend={isFrontend}
              toggleFrontend={toggleFrontend}
            />
            <SystemStatus isFrontend={isFrontend} />
          </div>
        )}
        <div className="floating-menu">
          {!isRunning && (
            <>
              <TopMenuButton
                text="Add Button"
                icon={<Zap size={16} />}
                padding={1.2}
                onClick={() => addNewNode("button", centerFlowPosition)}
              />
              <TopMenuButton icon={<Workflow size={22} strokeWidth={1.65} />} />
            </>
          )}
          <TopMenuButton
            text={
              !isRunning ? (
                <span className="font-semibold text-[0.95rem]">Run</span>
              ) : (
                <span
                  className="font-medium text-[0.95rem]"
                  style={{ color: "rgba(0, 0, 0, 0.75)" }}
                >
                  Back
                </span>
              )
            }
            icon={
              isRunning ? (
                <MoveLeft
                  size={16}
                  strokeWidth={2.3}
                  color={"rgba(0, 0, 0, 0.75)"}
                />
              ) : (
                <Play size={16} strokeWidth={2.3} />
              )
            }
            outlined={!isRunning}
            filled={!isRunning}
            padding={1.2}
            onClick={toggleIsRunning}
          />
        </div>
      </div>
      {!isRunning && (
        <div className="flex">
          <ComponentMenu
            addNewNode={addNewNode}
            centerFlowPosition={centerFlowPosition}
          />
        </div>
      )}
    </div>
  );
};

const TopMenuButton = ({
  text,
  icon,
  outlined,
  filled,
  padding,
  onClick,
}: {
  text?: any;
  icon?: any;
  outlined?: boolean;
  filled?: boolean;
  padding?: number;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${outlined && "floating-menu__button--outlined"} ${
        filled && "floating-menu__button--filled"
      } flex items-center justify-center gap-x-[0.45em] h-[2.7em] floating-menu__button rounded-[50em] font-medium`}
      style={padding ? { padding: `0 ${padding}em` } : { padding: "0 1em" }}
    >
      <span>{icon}</span>
      {text && <span>{text}</span>}
    </button>
  );
};

const FrontendToggle = ({
  toggleFrontend,
  isFrontend,
}: {
  toggleFrontend: () => void;
  isFrontend: boolean;
}) => {
  return (
    <div className="flex items-end">
      <div
        onClick={toggleFrontend}
        className={`flex h-[2.2em] aspect-[43/28] cursor-pointer rounded-full frontend-toggle ${
          isFrontend ? "justify-start" : "justify-end"
        } p-[1px]`}
      >
        <motion.div
          className="h-full aspect-square rounded-full frontend-toggle__thumb bg-white flex items-center justify-center"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          <CodeXml size={16} color={"rgba(0, 0, 0, 0.75)"} />
        </motion.div>
      </div>
    </div>
  );
};

const SystemStatus = ({ isFrontend }: { isFrontend: boolean }) => {
  return (
    <div
      className="flex gap-x-[0.4em] items-center justify-center pr-[0.7em] pl-[0.6em] py-[0.08em] rounded-[5px] mr-[1em]"
      style={
        isFrontend
          ? { background: "var(--secondary" }
          : { background: "#EEF1F7" }
      }
    >
      <div>
        <div
          className="aspect-square w-[0.45em] rounded-[10em]"
          style={
            isFrontend
              ? { background: "var(--primary)" }
              : { background: "#3354FF" }
          }
        />
      </div>
      <span
        className="text-[0.75rem] text-[var(--primary)] tracking-[0.01em] font-medium"
        style={isFrontend ? { color: "var(--primary)" } : { color: "#3354FF" }}
      >
        {isFrontend ? "Frontend" : "Backend"}
      </span>
    </div>
  );
};

export default TopMenu;
