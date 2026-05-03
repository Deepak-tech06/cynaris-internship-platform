import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// 🔐 Attach token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Only redirect if we're not already on login/register pages
      const publicPaths = ["/login", "/register", "/verify-invite"];
      if (!publicPaths.includes(window.location.pathname)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
