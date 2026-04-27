export function getApiBaseUrl() {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  if (rawBaseUrl.endsWith("/api/v1")) {
    return rawBaseUrl;
  }
  if (rawBaseUrl.endsWith("/api")) {
    return `${rawBaseUrl}/v1`;
  }

  return `${rawBaseUrl}/api/v1`;
}

export function getServerBaseUrl() {
  return getApiBaseUrl().replace(/\/api\/v1$/, "");
}

export function getSocketBaseUrl() {
  return process.env.NEXT_PUBLIC_SOCKET_URL || getServerBaseUrl();
}
