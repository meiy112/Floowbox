import { BASE_URL } from "./config";

export const requests = {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
}

// performs a get request to the given url. Throws an error on faliure
async function getRequest(url?: string) {
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'GET',
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for GET " + url)
  }
  
  // if nothing went wrong, return data
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message + ": " + data.details + " at GET " + url); 
  }
}

// performs a post request to the given url with the given body. Throws an error on faliure
// body must be a json object
async function postRequest(url?: string, body?: any) {
  // req headers
  const headers = {
    'Content-Type' : 'application/json'
  };
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for POST " + url)
  }
  
  // if nothing went wrong, return data
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message + ": " + data.details + " at POST " + url);
  }
}

// performs a put request to the given url. Throws an error on faliure
async function putRequest(url?: string, body?: any) {
  // req headers
  const headers = {
    'Content-Type' : 'application/json'
  };
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body),
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for PUT " + url)
  }
  
  // if nothing went wrong, return data
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message + ": " + data.details + " at PUT " + url); 
  }
}

// performs a patch request to the given url. Throws an error on faliure
async function patchRequest(url?: string, body?: any) {
  // req headers
  const headers = {
    'Content-Type' : 'application/json'
  };
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(body),
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for PATCH " + url)
  }
  
  // if nothing went wrong, return data
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message + ": " + data.details + " at PATCH " + url);
  }
}

// performs a delete request to the given url. Throws an error on faliure
async function deleteRequest(url?: string) {
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'DELETE',
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for DELETE " + url)
  }
  
  // if nothing went wrong, return
  if (response.ok) {
    return;
  } else {
    throw new Error(data.message + ": " + data.details + " at DELETE " + url); 
  }
}