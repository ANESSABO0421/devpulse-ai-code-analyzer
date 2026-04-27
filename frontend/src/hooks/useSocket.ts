"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";

export function useSocket(
  reviewId?: string,
  handlers?: Record<string, (payload: unknown) => void>,
) {
  useEffect(() => {
    if (!reviewId) {
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join_review", { reviewId });

    for (const [event, handler] of Object.entries(handlers || {})) {
      socket.on(event, handler);
    }

    return () => {
      socket.emit("leave_review", { reviewId });
      for (const [event, handler] of Object.entries(handlers || {})) {
        socket.off(event, handler);
      }
    };
  }, [handlers, reviewId]);

  return socket;
}
