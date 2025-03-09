import { requests } from "./requestTemplate"
export const modelApi = {
  generate,
};

const modelMap: { [key: string]: string } = {
  "GPT o3-mini": "openai",
  Ollama: "cloudflare",
  Gemini: "gemini",
  Deepseek: "openai",
  "DALLE 3": "cloudflare",
  Midjourney: "cloudflare",
  DreamShaper: "cloudflare",
  "TTS-1": "openai",
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

    // TODO: test image
    case "image":
      response = await fetch(url, {
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
  
      // make blob
      blob = await response.blob();
      blobUrl = URL.createObjectURL(blob);
      return blobUrl
  
    // TODO: test audio
    case "audio":
      response = await fetch(url, {
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
      blobUrl = URL.createObjectURL(blob);
      return blobUrl

    default:
      throw new Error("\'outputType\' parameter must be one of text, audio, or image.")
  }
}