import { BookOpen, BotMessageSquare, FileAudio } from "lucide-react";

export enum ModelType {
  Text = "text",
  Image = "image",
  Audio = "audio",
  File = "file",
}

export const modelIconMap: { [key: string]: string } = {
  openaiText: "/images/openai-icon-text.svg",
  openaiImage: "/images/openai-icon-image.svg",
  openaiAudio: "/images/openai-icon-audio.svg",
  midjourney: "/images/midjourney-icon.svg",
  gemini: "/images/gemini-icon.svg",
  deepseek: "/images/deepseek-icon.svg",
  PDF: "",
};

export const typeIconMap = {
  audio: <FileAudio strokeWidth={2} size={28} />,
  llm: <BotMessageSquare strokeWidth={2} size={28} />,
  file: <BookOpen strokeWidth={2} size={28} />,
  image: <FileAudio strokeWidth={2} size={28} />,
};
