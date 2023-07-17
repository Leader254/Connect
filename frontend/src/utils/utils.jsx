import axios from "axios";
export const apiDomain = "http://localhost:3000";

export const makeRequest = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
});