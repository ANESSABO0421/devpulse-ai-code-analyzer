import { getIo } from "../config/socket";

export function emitToReviewRoom(reviewId: string, event: string, payload: unknown) {
  getIo().to(reviewId).emit(event, payload);
}
