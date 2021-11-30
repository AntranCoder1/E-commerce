import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTBiNjBhMDE0ZTRiMWNjNzEzOTM3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODI2Njc4MSwiZXhwIjoxNjM4NTI1OTgxfQ.ii6rGjcX9UhETy4JvC9Ns3MOKd7iH3lbQwiunQLSuFE";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequset = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});