import { useState } from "react";
import "./AIModel.css";
import { s } from "framer-motion/client";
import { modelIconMap, ModelType } from "./utils";
import Input from "../input-field/Input";
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  BotMessageSquare,
  BookOpen,
  PencilLine,
  FileAudio,
  Palette,
} from "lucide-react";

type HeaderProps = {
  type: string;
  isOpen: boolean;
  setIsOpen: (value: (prev: any) => boolean) => void;
};

const Header = ({ type, isOpen, setIsOpen }: HeaderProps) => {
  const [title, setTitle] = useState("Double Click to Edit Title");
  const [isEditing, setIsEditing] = useState(false);

  const optionsMap = {
    text: "Text AI",
    image: "Image AI",
    audio: "Audio AI",
    file: "File Parser",
  };
  const aiType = optionsMap[type as ModelType];

  const iconMap: { [key: string]: any } = {
    text: (
      <BotMessageSquare
        size={30}
        style={{ color: `rgba(var(--${type}__font-rgb), 1)` }}
      />
    ),
    image: (
      <Palette
        size={30}
        style={{ color: `rgba(var(--${type}__font-rgb), 1)` }}
      />
    ),
    audio: (
      <FileAudio
        size={30}
        style={{ color: `rgba(var(--${type}__font-rgb), 1)` }}
      />
    ),
    file: (
      <BookOpen
        size={30}
        style={{ color: `rgba(var(--${type}__font-rgb), 1)` }}
      />
    ),
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

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
            {iconMap[type]}
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
          <div className="flex flex-row items-center space-x-3">
            <div className="font-semibold text-[1rem]">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="border border-gray-300 rounded w-full focus:outline-none"
                />
              ) : (
                <div
                  onDoubleClick={handleDoubleClick}
                  className="cursor-pointer"
                >
                  {title}
                </div>
              )}
            </div>
            <PencilLine size={18} style={{ color: "var(--font--light)" }} />
          </div>
        </div>
        <button
          className="absolute top-[-5] right-[-5] p-2 cursor-pointer"
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

  const optionsMap = {
    text: ["GPT o3-mini", "Gemini", "Ollama", "Deepseek"],
    image: ["DALLE 3", "DreamShaper", "Midjourney"],
    audio: ["TTS-1"],
    file: ["PDF"],
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
    PDF: "/images/pdf-icon.svg",
  };
  const modelIcon = iconMap[model as keyof typeof iconMap];

  return (
    <div className="flex flex-col gap-y-[0.3em]">
      <div className="ai-model__label--s">
        {type == "file" ? "File format" : "AI Model"}
      </div>

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


type VoiceDropdownProps = {
  voice: string;
  setVoice: (value: string) => void;
};

const VoiceDropdown = ({ voice, setVoice }: VoiceDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const voices = ["alloy", "ash", "coral", "echo", "fable", "onyx", "nova", "sage", "shimmer"]

  return (
    <div className="flex flex-col gap-y-[0.3em]">
      <div className="relative w-full">
        {/* Dropdown Button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full aspect-[8/1] font-medium ai-model__input flex justify-between items-center cursor-pointer"
        >
          <div className="flex items-center py-2 px-3">
            {voice}
          </div>

          <span className="mr-[1em]">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul className="absolute left-0 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10">
            {voices.map((voice, index) => (
              <li
                key={index}
                className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setVoice(voice);
                  setIsOpen(false);
                }}
              >
                <div className="pr-10">
                  {voice}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

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
  const [temperature, setTemperature] = useState(0.5);
  const [prompt, setPrompt] = useState("");
  const [maxLength, setMaxLength] = useState(200);
  const [negativePrompt, setNegativePrompt] = useState("")
  const [speed, setSpeed] = useState(0.5)
  const [voice, setVoice] = useState("alloy")

  return (
    <div className="ai-model__container container-shadow text-black bg-white w-[25em] rounded-[20px] p-[1em] flex flex-col gap-y-[1.2em]">
      <Header type={type} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen ? (
        <>
          <div className="border-[1px] border-gray-100"></div>
          <ModelSelection model={model} setModel={setModel} type={type} />
          {type != "file" && (
            <ContextInput text={context} setText={setContext} />
          )}
          {(type == "text" || type == "image") && (
            <div className="flex flex-col gap-y-[0.2em]">
              <div className="ai-model__label--s">Prompt</div>
              <textarea
                id="text-input"
                value={prompt}
                onChange={(e: any) => setPrompt(e)}
                className="leading-tight w-full aspect-[4/1] text-[0.85rem] rounded-[10px] resize-none ai-model__input py-[0.5em] px-[0.8em] placeholder-[#BAB7C3]"
                placeholder="Prompt for the AI."
              />
          </div>
          )}
          {type == "image" && (
            <div className="flex flex-col gap-y-[0.2em]">
              <div className="ai-model__label--s">Negative Prompt</div>
              <textarea
                id="text-input"
                value={negativePrompt}
                onChange={(e: any) => setNegativePrompt(e)}
                className="leading-tight w-full aspect-[4/1] text-[0.85rem] rounded-[10px] resize-none ai-model__input py-[0.5em] px-[0.8em] placeholder-[#BAB7C3]"
                placeholder="What not to include in the generated image."
              />
          </div>
          )}
          {type != "file" && (
            <div className="flex flex-col gap-y-[0.2em]">
              <div className="ai-model__label--s">Temperature</div>
              <Input
                value={temperature}
                updateValue={setTemperature}
                max={1}
                type={type}
              />
            </div>
          )}
          {type == "text" && (
            <div className="flex flex-col gap-y-[0.2em]">
              <div className="ai-model__label--s">Max length (Tokens)</div>
              <Input
                value={maxLength}
                updateValue={setMaxLength}
                max={1000}
                type={type}
              />
          </div>
          )}
          {type == "audio" && (
            <div className="flex flex-col gap-y-[0.2em]">
              <div className="ai-model__label--s">Voice</div>
              <VoiceDropdown voice={voice} setVoice={setVoice}/>
          </div>
          )}
          {type == "audio" && (
            <div className="flex flex-col gap-y-[0.2em]">
              <div className="ai-model__label--s">Speed</div>
              <Input
                value={speed}
                updateValue={setSpeed}
                max={1}
                type={type}
              />
          </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default AIModel;
s;
