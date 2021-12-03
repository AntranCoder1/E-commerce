import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTBiNjBhMDE0ZTRiMWNjNzEzOTM3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODUxMjM2OCwiZXhwIjoxNjM4NzcxNTY4fQ.w02huiVLFCAaFAe6DlI_GYL5qwS8NpdGRFRD1J4RHag";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequset = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});