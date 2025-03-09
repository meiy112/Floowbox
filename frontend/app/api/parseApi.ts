export const parseApi = {
  parsePdf,
};
import { BASE_URL } from "./config";

async function parsePdf(pdfFile: Blob) {
  const url = BASE_URL + "/api/extract-text";

  const formData = new FormData();
  formData.append("pdf", pdfFile); 

  const response = await fetch(url, {
    method: "POST",
    body: formData,  
  });

  const data = await response.json();
  return data["text"];

}