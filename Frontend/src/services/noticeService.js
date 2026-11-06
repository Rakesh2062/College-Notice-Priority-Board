import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data.data;
};

export const registerApi = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data.data;
};

export const getMeApi = async () => {
  const response = await api.get("/auth/me");
  return response.data.data;
};

export const getNotices = async () => {
  const response = await api.get("/notices");
  return response.data.data;
};

export const createNotice = async (noticeData) => {
  const response = await api.post("/notices", noticeData);
  return response.data.data;
};

export const updateReadStatus = async (id, isRead) => {
  const response = await api.patch(`/notices/${id}/read-status`, { isRead });
  return response.data.data;
};

export const updateNotice = async (id, noticeData) => {
  const response = await api.put(`/notices/${id}`, noticeData);
  return response.data.data;
};

export const deleteNotice = async (id) => {
  const response = await api.delete(`/notices/${id}`);
  return response.data.data;
};

export default api;
