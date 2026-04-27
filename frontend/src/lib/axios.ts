"use client";

import axios from "axios";

function normalizeApiBaseUrl() {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  return rawBaseUrl.endsWith("/api/v1")
    ? rawBaseUrl
    : rawBaseUrl.endsWith("/api")
      ? `${rawBaseUrl}/v1`
      : `${rawBaseUrl}/api/v1`;
}

export const axiosInstance = axios.create({
  baseURL: normalizeApiBaseUrl(),
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const authState = localStorage.getItem("devpulse-auth");
    const token = authState ? JSON.parse(authState)?.state?.token : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
