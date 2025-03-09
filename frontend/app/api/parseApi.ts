export const parseApi = {
  parsePdf,
};
import { BASE_URL } from "./config";

async function parsePdf(pdfFile: Blob) {
  console.log("inside parsePdf()")
  const url = BASE_URL + "/api/extract-text";
  console.log("url: ", url)

  const formData = new FormData();
  formData.append("pdf", pdfFile); 

  console.log("appended form data")

  const response = await fetch(url, {
    method: "POST",
    body: formData,  
  });

  console.log("response recieved")
  console.log(response)
  
  const data = await response.json();
  return data["text"];

}