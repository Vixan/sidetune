import axios from "axios";

// INFO: Replace with "https://cors-anywhere.herokuapp.com/" if the below proxy does not work
const allowCorsProxyUrl = "https://thingproxy.freeboard.io/fetch/";
const deezerApiUrl = "https://api.deezer.com/";

export const deezerService = axios.create({
  baseURL: `${allowCorsProxyUrl}${deezerApiUrl}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});
