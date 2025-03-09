import { useEffect, useRef, useState } from "react";
import "./TextNode.css";
import { PipelineNode } from "@/app/class/Pipeline";
import BackendBox from "@/app/components/boxes/BackendBox";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";

const TextNode = ({
  data,
  isConnectable,
  id,
}: {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
}) => {
  const [value, setValue] = useState("");
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();

  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "text",
    process: (input: string) => {
      if (input) {
        setValue(input);
      }
      console.log("Text Input processing. Returning value:", valueRef.current);
      return valueRef.current;
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, []);

  return (
    <div
      className="text-black relative flex items-center justify-center text-node"
      style={{ height: "215px", zIndex: 5 }}
    >
      <div className={isFrontend ? "" : "invisible"}>
        <FrontendTextBox handleChange={handleChange} value={value} />
      </div>
      <BackendTextBox
        isConnectable={isConnectable}
        hidden={isFrontend}
        id={id}
      />
    </div>
  );
};

const FrontendTextBox = ({
  value,
  handleChange,
}: {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => {
  return (
    <div className="bg-white text-box__frontend-container text-box h-[215px]">
      <div className="text-box__frontend rounded-[15px] overflow-hidden flex h-full">
        <textarea
          placeholder="Start typing here..."
          rows={10}
          value={value}
          onChange={handleChange}
          className="m-[1em] flex-1 w-full h-full resize-none focus:outline-none placeholder-[#BAB7C3]"
        />
      </div>
    </div>
  );
};

const BackendTextBox = ({
  isConnectable,
  hidden = false,
  id,
}: {
  isConnectable: boolean;
  hidden?: boolean;
  id: string;
}) => {
  return (
    <div
      className="text-box__backend-container absolute inset-0 text-box h-[215px] flex items-center justify-center"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <BackendBox type="text" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default TextNode;
