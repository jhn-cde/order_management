import axios from 'axios'

export const api = axios.create({
  baseURL: "https://order-management-jhn-cde.vercel.app/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});