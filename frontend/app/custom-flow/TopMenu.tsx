import {
  AudioLines,
  BotMessageSquare,
  ChevronUp,
  CodeXml,
  FileAudio,
  Heading,
  House,
  Image,
  Palette,
  PencilLine,
  Play,
  Plus,
  Text,
  Type,
  Upload,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";
import "./TopMenu.css";
import { motion } from "framer-motion";
import Divider from "../components/divider/Divider";
import { useState } from "react";

const TopMenu = ({
  isFrontend,
  toggleFrontend,
  name,
  setName,
}: {
  isFrontend: boolean;
  toggleFrontend: () => void;
  name: string;
  setName: (name: string) => void;
}) => {
  return (
    <div className="pointer-events-none absolute text-black z-10 py-[1em] px-[1.4em] text-[0.9em] flex flex-col w-full gap-y-[1em]">
      <div className="select-none items-center justify-between flex w-full">
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
              <UsersRound size={16} />
            </button>
          </span>
          <Divider height={2.5} />
          <FrontendToggle
            isFrontend={isFrontend}
            toggleFrontend={toggleFrontend}
          />
        </div>
        <div className="floating-menu">
          <TopMenuButton
            text="Add Button"
            icon={<Zap size={16} />}
            padding={1.2}
          />
          <TopMenuButton icon={<Workflow size={22} strokeWidth={1.65} />} />
          <TopMenuButton
            text={<span className="font-semibold text-[0.95rem]">Run</span>}
            icon={<Play size={16} strokeWidth={2.3} />}
            outlined={true}
            filled={true}
            padding={1.2}
          />
        </div>
      </div>
      <div className="flex">
        <ComponentMenu />
      </div>
    </div>
  );
};

const ComponentMenu = () => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="">
      {expand ? (
        <div className="top-menu__component-menu flex flex-col gap-y-[0.5em] overflow-hidden items-center justify-between py-[0.6em]">
          <button
            className="component-menu__button--collapse"
            onClick={() => setExpand(false)}
          >
            <ChevronUp size={22} strokeWidth={1.65} />
          </button>
          <Divider isHorizontal={true} width={2.5} />
          <div className="component-menu__section">
            <button className="component-menu__button--component">
              <Type size={22} strokeWidth={1.65} />
            </button>
            <button className="component-menu__button--component">
              <Image size={22} strokeWidth={1.65} />
            </button>
            <button className="component-menu__button--component">
              <AudioLines size={22} strokeWidth={1.65} />
            </button>
            <button className="component-menu__button--component">
              <Heading size={22} strokeWidth={1.65} />
            </button>
            <button className="component-menu__button--component">
              <Upload size={22} strokeWidth={1.65} />
            </button>
          </div>
          <Divider isHorizontal={true} width={2.5} />
          <div className="component-menu__section">
            <button className="component-menu__button--component">
              <BotMessageSquare size={22} strokeWidth={1.65} />
            </button>
            <button className="component-menu__button--component">
              <Palette size={22} strokeWidth={1.65} />
            </button>
            <button className="component-menu__button--component">
              <FileAudio size={22} strokeWidth={1.65} />
            </button>
            <button className="component-menu__button--component">
              <Heading size={22} strokeWidth={1.65} />
            </button>
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

const TopMenuButton = ({
  text,
  icon,
  outlined,
  filled,
  padding,
}: {
  text?: any;
  icon?: any;
  outlined?: boolean;
  filled?: boolean;
  padding?: number;
}) => {
  return (
    <button
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

export default TopMenu;
