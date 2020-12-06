import axios from "axios";

const allowCorsProxyUrl = "https://cors-anywhere.herokuapp.com/";
const deezerApiUrl = "https://api.deezer.com/";

export const deezerService = axios.create({
  baseURL: `${allowCorsProxyUrl}${deezerApiUrl}`
});
