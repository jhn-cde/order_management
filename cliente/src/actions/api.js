export default api = axios.create({
  baseURL: "https://order-management-jhn-cde.vercel.app/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});