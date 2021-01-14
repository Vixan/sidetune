import axios from "axios";

// INFO: Replace with "https://cors-anywhere.herokuapp.com/" if the below proxy does not work
const allowCorsProxyUrl = "http://localhost:8080/";

const deezerApiUrl = "https://api.deezer.com/";
// TODO: Replace with SoundCloud or Spotify APIs if they support audio playback / return track URLs
export const deezerService = axios.create({
  baseURL: `${allowCorsProxyUrl}${deezerApiUrl}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});

const lyricsOvhApiUrl = "https://api.lyrics.ovh/v1/";
export const lyricsOvhService = axios.create({
  baseURL: `${allowCorsProxyUrl}${lyricsOvhApiUrl}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});
