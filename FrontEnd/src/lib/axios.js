import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" ?
"http://localhost:5001/api"  : "https://video-calling-app-backend-two.vercel.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  //timeout: 1000,
  withCredentials : true
});
