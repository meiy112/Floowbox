import { Image, Type } from "lucide-react";
import NodeHandleWrapper from "../NodeHandleWrapper";
import "./BackendBox.css";

const BackendBox = ({
  type,
  isConnectable,
  id,
}: {
  type: "text" | "image" | "audio";
  isConnectable: boolean;
  id: string;
}) => {
  const typeToLabel = {
    text: "Text Box",
    image: "Image Box",
    audio: "Audio Box",
  };

  const SIZE = 24;
  const STROKE_WIDTH = 1.5;

  const typeToIcon = {
    text: <Type size={SIZE} strokeWidth={STROKE_WIDTH} />,
    image: <Image size={SIZE} strokeWidth={STROKE_WIDTH} />,
    audio: <Image size={SIZE} strokeWidth={STROKE_WIDTH} />,
  };

  return (
    <NodeHandleWrapper id={id} type={type} isConnectable={isConnectable}>
      <div
        className="flex relative rounded-[10px] p-[0.25em] text-[0.9rem]"
        style={{
          backgroundColor: `rgba(var(--${type}__background-rgb), 1)`,
        }}
      >
        <div
          className={`bg-white backend-box__${type} rounded-[8px] font-medium h-[3em] pl-[0.7em] pr-[1.2em] flex items-center justify-center`}
        >
          <div
            className="flex items-center justify-center gap-x-[0.4em]"
            style={{ color: `rgba(var(--${type}__font-rgb), 1)` }}
          >
            <span>{typeToIcon[type]}</span>
            <span className="text-black font-medium">{typeToLabel[type]}</span>
          </div>
        </div>
      </div>
    </NodeHandleWrapper>
  );
};

export default BackendBox;
