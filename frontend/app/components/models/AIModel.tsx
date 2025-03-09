import { useState } from "react";
import "./AIModel.css";
import { s } from "framer-motion/client";
import { modelIconMap, ModelType } from "./utils";
import { ChevronDown, ChevronUp, Maximize2, Minimize2 } from "lucide-react";

type HeaderProps = {
  type: string;
  isOpen: boolean;
  setIsOpen: (value: (prev: any) => boolean) => void;
};

const Header = ({ type, isOpen, setIsOpen }: HeaderProps) => {
  const optionsMap = {
    text: "Text AI",
    image: "Image AI",
    audio: "Audio AI",
  };
  const aiType = optionsMap[type as ModelType];

  return (
    <>
      <div className="relative flex items-center gap-x-[0.9em]">
        <div
          className="rounded-[10px] p-[0.25em]"
          style={{ background: `rgba(var(--${type}__background-rgb), 1)` }}
        >
          <div
            className={`backend-box__${type} rounded-[8px] h-[3em] w-[3em] bg-white flex items-center justify-center`}
          >
            <img src={modelIconMap[type as ModelType]} alt="Icon" />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-y-[0.15em]">
          <div className="flex">
            <div
              className={`rounded-[10em] font-medium text-[0.7rem] flex items-center justify-center px-[0.7em] py-[0.04em]`}
              style={{
                backgroundColor: `rgba(var(--${type}__background-rgb), 1)`,
                color: `rgba(var(--${type}__font-rgb), 1)`,
              }}
            >
              {aiType}
            </div>
          </div>
          <div className="font-semibold text-[1rem]">Hello World</div>
        </div>
        <button
          className="absolute top-[-5] right-[-5] p-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
    </>
  );
};

type ModelSelectionProps = {
  model: string;
  setModel: (value: string) => void;
  type: string;
};

const ModelSelection = ({ model, setModel, type }: ModelSelectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: add more models to the map
  const optionsMap = {
    text: ["GPT o3-mini", "Gemini", "Ollama", "Deepseek"],
    image: ["DALLE 3", "DreamShaper", "Midjourney"],
    audio: ["TTS-1"],
  };
  const options = optionsMap[type as ModelType];

  const iconMap = {
    "GPT o3-mini": "/images/openai-icon-text.svg",
    Ollama: "/images/ollama-icon.svg",
    Gemini: "/images/gemini-icon.svg",
    Deepseek: "/images/deepseek-icon.svg",
    "DALLE 3": "/images/openai-icon-image.svg",
    Midjourney: "/images/midjourney-icon.svg",
    DreamShaper: "/images/cloudflare-icon.svg",
    "TTS-1": "/images/openai-icon-audio.svg",
  };
  const modelIcon = iconMap[model as keyof typeof iconMap];

  return (
    <div className="flex flex-col gap-y-[0.3em]">
      <div className="ai-model__label--s">AI Model</div>

      <div className="relative w-full">
        {/* Dropdown Button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full aspect-[8/1] font-medium ai-model__input flex justify-between items-center cursor-pointer"
        >
          <div className="flex items-center p-[0.4em]">
            <div
              className={`rounded-[7px] mr-3 flex items-center justify-center p-[0.4em]`}
              style={{
                backgroundColor: `rgba(var(--${type}__background-rgb), 1)`,
              }}
            >
              <img src={modelIcon} alt="Icon" width="23px" height="23px" />
            </div>
            {model}
          </div>

          <span className="mr-[1em]">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul className="absolute left-0 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
            {options.map((option, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setModel(option);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  {/* Icon */}
                  <div
                    className={`rounded-[7px] mr-3 flex items-center justify-center w-[38px] h-[38px]`}
                    style={{
                      backgroundColor: `rgba(var(--${type}__background-rgb), 1)`,
                    }}
                  >
                    <img
                      src={iconMap[option as keyof typeof iconMap]}
                      alt="Icon"
                      className="w-[29px] h-[29px]"
                    />
                  </div>
                  {option}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

type ContextInputProps = {
  text: string;
  setText: (value: string) => void;
};

const ContextInput = ({ text, setText }: ContextInputProps) => {
  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col gap-y-[0.3em]">
      <div className="ai-model__label--s">Context</div>
      <textarea
        id="text-input"
        value={text}
        onChange={handleChange}
        className="leading-tight w-full aspect-[4/1] text-[0.85rem] rounded-[10px] resize-none ai-model__input py-[0.5em] px-[0.8em] placeholder-[#BAB7C3]"
        placeholder="Context for the AI model that can be referenced in the prompt."
      />
    </div>
  );
};

type AIModelProps = {
  type: string;
  model: string;
  setModel: (value: string) => void;
  context: string;
  setContext: (value: string) => void;
};

const AIModel = ({
  type,
  model,
  setModel,
  context,
  setContext,
}: AIModelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="ai-model__container container-shadow text-black bg-white w-[25em] rounded-[20px] p-[1em] flex flex-col gap-y-[1em]">
      <Header type={type} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen ? (
        <>
          <div className="border-[1px] border-gray-100"></div>
          <ModelSelection model={model} setModel={setModel} type={type} />
          <ContextInput text={context} setText={setContext} />
        </>
      ) : null}
    </div>
  );
};

export default AIModel;
s;
