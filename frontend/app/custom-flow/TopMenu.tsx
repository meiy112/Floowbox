import { CodeXml, Play, Workflow, Zap } from "lucide-react";
import "./TopMenu.css";
import { motion } from "framer-motion";

const TopMenu = ({
  isFrontend,
  toggleFrontend,
}: {
  isFrontend: boolean;
  toggleFrontend: () => void;
}) => {
  return (
    <div className="select-none absolute text-black z-10 py-[1em] px-[1.4em] items-center justify-between flex w-full text-[0.9em]">
      <div className="floating-menu">
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
    <div className="flex items-end pl-[1.75vw]">
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
