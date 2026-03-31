import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const postTransaction = (payload) => api.post("/transactions", payload);

export default api;
