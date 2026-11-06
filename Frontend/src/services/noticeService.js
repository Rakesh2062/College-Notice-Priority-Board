import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

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
