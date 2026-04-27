import { Server as HttpServer } from "http";
import { Server } from "socket.io";

let io: Server | null = null;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_review", ({ reviewId }: { reviewId: string }) => {
      socket.join(reviewId);
    });

    socket.on("leave_review", ({ reviewId }: { reviewId: string }) => {
      socket.leave(reviewId);
    });

    socket.on(
      "typing",
      ({ reviewId, userId, name }: { reviewId: string; userId: string; name: string }) => {
        socket.to(reviewId).emit("user_typing", { userId, name });
      },
    );
  });

  return io;
}

export function getIo() {
  if (!io) {
    throw new Error("Socket.io has not been initialized");
  }

  return io;
}
