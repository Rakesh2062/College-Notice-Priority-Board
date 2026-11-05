import axios from "axios";

// Create a reusable Axios instance.
// The baseURL comes from the .env file via Vite's import.meta.env.
// This means we never hardcode "http://localhost:5000/api" in components.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Fetch all notices from the backend.
 * GET /notices → { success: true, data: [...] }
 * We return only the inner `data` array so callers don't need to unwrap it.
 */
export const getNotices = async () => {
  const response = await api.get("/notices");
  return response.data.data;
};

/**
 * Create a new notice
 * POST /notices  body: { title, description, category, priority, date }
 */
export const createNotice = async (noticeData) => {
  const response = await api.post("/notices", noticeData);
  return response.data.data;
};

/**
 * Toggle a notice's read/unread status.
 * PATCH /notices/:id/read-status  body: { isRead }
 * Returns the updated notice object from the server.
 */
export const updateReadStatus = async (id, isRead) => {
  const response = await api.patch(`/notices/${id}/read-status`, { isRead });
  return response.data.data;
};
