import { requests } from "./requestTemplate"
export const modelApi = {
  generate,
};
import { BASE_URL } from "./config";


const modelMap: {[key: string]: string } = {
  "GPT o3-mini": "openai",
  Ollama: "cloudflare",
  Gemini: "gemini",
  Deepseek: "openai",
  "DALLE 3": "cloudflare",
  Midjourney: "cloudflare",
  DreamShaper: "cloudflare",
  "TTS-1": "openai",
  "TTS (text-to-speech)": "openai",
};

async function generate(model: string, inputType: string, outputType: string, prompt: string, options: any) {
  model = modelMap[model];
  const url = `/api/model/${model}/${inputType}/${outputType}`;
  const body =  {
    "prompt": prompt,
    "options": options,
  }

  let response;
  let blob;
  let blobUrl;
  switch(outputType) {
    case "text":
      response = await requests.postRequest(url, body);
      return response;

    case "image":
      response = await fetch(BASE_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), 
      });
  
      if (!response.ok) {
        console.error("Failed to fetch image");
        return;
      }
  
      // make blob
      blob = await response.blob();
      blobUrl = URL.createObjectURL(blob);
      return blobUrl
  
    case "audio":
      response = await fetch(BASE_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), 
      });
  
      if (!response.ok) {
        console.error("Failed to fetch audio");
        return;
      }
  
      blob = await response.blob();
      return blob

    default:
      throw new Error("\'outputType\' parameter must be one of text, audio, or image.")
  }
}