import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTBiNjBhMDE0ZTRiMWNjNzEzOTM3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODUyODE1MywiZXhwIjoxNjM4Nzg3MzUzfQ.2iaDerA6jPg4qTlhFO1O3KIjUZvDbLGfjneHpa4pjqQ";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequset = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});