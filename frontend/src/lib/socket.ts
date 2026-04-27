"use client";

import { io } from "socket.io-client";
import { getSocketBaseUrl } from "./env";

export const socket = io(getSocketBaseUrl(), {
  autoConnect: false,
});
