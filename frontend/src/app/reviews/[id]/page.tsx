"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { AIFeedback } from "@/components/review/AIFeedback";
import { ReviewStatus } from "@/components/review/ReviewStatus";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { LineComment } from "@/components/editor/LineComment";
import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axios";
import { useReview } from "@/hooks/useReview";
import { useSocket } from "@/hooks/useSocket";
import { useReviewStore } from "@/store/useReviewStore";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";

interface SocketCommentPayload {
  comment: import("@/types/comment").Comment;
}

interface SocketDeletedPayload {
  commentId: string;
}

interface SocketStatusPayload {
  status: "pending" | "reviewed" | "resolved";
}

export default function ReviewDetailPage() {
  useAuth();
  const params = useParams<{ id: string }>();
  const { currentReview, comments, loading, error } = useReview(params.id);
  const { addComment, updateComment, removeComment, setCurrentReview } = useReviewStore();
  const { user } = useAuthStore();
  const [comment, setComment] = useState("");
  const [line, setLine] = useState("");

  const socketHandlers = useMemo(
    () => ({
      new_comment: (payload: unknown) => addComment((payload as SocketCommentPayload).comment),
      comment_updated: (payload: unknown) => updateComment((payload as SocketCommentPayload).comment),
      comment_deleted: (payload: unknown) => removeComment((payload as SocketDeletedPayload).commentId),
      review_status_changed: (payload: unknown) => {
        const { status } = payload as SocketStatusPayload;
        return currentReview ? setCurrentReview({ ...currentReview, status }) : undefined;
      },
    }),
    [addComment, currentReview, removeComment, setCurrentReview, updateComment],
  );

  useSocket(params.id, socketHandlers);

  const groupedComments = useMemo(() => {
    const lineComments = comments.filter((item) => item.line);
    const generalComments = comments.filter((item) => !item.line);
    return { lineComments, generalComments };
  }, [comments]);

  if (loading) {
    return <AppShell><div className="card p-6">Loading review...</div></AppShell>;
  }

  if (error || !currentReview) {
    return (
      <AppShell>
        <div className="card p-6">
          <h2 className="text-2xl font-semibold">Couldn&apos;t load this review</h2>
          <p className="mt-3 text-[var(--muted)]">
            {error || "This review may not exist anymore or you may not have access to it."}
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-black">{currentReview.title}</h1>
          <p className="mt-3 text-[var(--muted)]">Review live with line comments, AI feedback, and a shared status.</p>
        </div>
        <div className="flex items-center gap-3">
          <ReviewStatus
            value={currentReview.status}
            onChange={async (status) => {
              const { data } = await axiosInstance.patch(`/reviews/${currentReview._id}/status`, { status });
              setCurrentReview(data.review);
            }}
          />
          <Button
            variant="secondary"
            onClick={async () => {
              const { data } = await axiosInstance.post(`/reviews/${currentReview._id}/ai-rerun`);
              setCurrentReview({ ...currentReview, ...data });
              toast.success("AI review refreshed");
            }}
          >
            Re-run AI
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CodeEditor
          value={currentReview.code}
          language={currentReview.language}
          readOnly
          suggestions={currentReview.aiSuggestions}
        />
        <AIFeedback review={currentReview} />
      </div>

      <section className="card p-6">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="mt-5 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              await axiosInstance.post("/comments", {
                reviewId: currentReview._id,
                content: comment,
                line: line ? Number(line) : undefined,
              });
              if (user) {
                toast.success("Comment posted");
              }
              setComment("");
              setLine("");
            }}
          >
            <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Optional line number" value={line} onChange={(event) => setLine(event.target.value)} />
            <textarea className="min-h-36 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Share your feedback with the team" value={comment} onChange={(event) => setComment(event.target.value)} />
            <Button type="submit">Add Comment</Button>
          </form>
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold">Line-specific comments</h3>
              <div className="space-y-3">
                {groupedComments.lineComments.map((item) => <LineComment key={item._id} comment={item} />)}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold">General comments</h3>
              <div className="space-y-3">
                {groupedComments.generalComments.map((item) => <LineComment key={item._id} comment={item} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
