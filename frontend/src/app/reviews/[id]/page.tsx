"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { AIFeedback } from "@/components/features/reviews/AIFeedback";
import { ReviewStatus } from "@/components/features/reviews/ReviewStatus";
import { CodeEditor } from "@/components/features/reviews/CodeEditor";
import { LineComment } from "@/components/features/reviews/LineComment";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { axiosInstance } from "@/lib/axios";
import { useReview } from "@/hooks/useReview";
import { useSocket } from "@/hooks/useSocket";
import { useReviewStore } from "@/store/useReviewStore";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { RefreshCw, MessageCircle, Hash, Send, AlertCircle } from "lucide-react";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { getApiErrorMessage } from "@/lib/api";

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
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { currentReview, comments, loading, error } = useReview(params.id);
  const { addComment, updateComment, removeComment, setCurrentReview } = useReviewStore();
  const { user } = useAuthStore();
  const [comment, setComment] = useState("");
  const [line, setLine] = useState("");
  const [isRerunning, setIsRerunning] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
  const reviewAuthorId = currentReview
    ? typeof currentReview.authorId === "string"
      ? currentReview.authorId
      : currentReview.authorId?._id
    : null;
  const canDeleteReview = reviewAuthorId === user?._id;

  async function handleDeleteReview() {
    if (!currentReview || !canDeleteReview) return;
    if (!window.confirm(`Delete review "${currentReview.title}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/reviews/${currentReview._id}`);
      toast.success("Review deleted");
      router.push("/reviews");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Delete failed"));
      setIsDeleting(false);
    }
  }

  if (loading) {
    return (
      <AppShell>
        <div className="card flex h-64 flex-col items-center justify-center p-10 text-center">
          <RefreshCw size={32} className="mb-4 animate-spin text-[color:var(--accent)]" />
          <p className="text-muted">Loading review workspace...</p>
        </div>
      </AppShell>
    );
  }

  if (error || !currentReview) {
    return (
      <AppShell>
        <div className="card border-[color:var(--danger)] bg-[color:var(--danger)]/5 p-10 text-center">
          <AlertCircle size={48} className="mx-auto mb-6 text-[color:var(--danger)]" />
          <h2 className="text-2xl font-black text-[color:var(--foreground)]">Review not found</h2>
          <p className="mt-4 text-muted">
            {error || "This review may have been deleted or moved to another workspace."}
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2">
            <Badge tone="info">{currentReview.language}</Badge>
          </div>
          <h1 className="text-3xl font-black leading-[0.95] tracking-tight text-[color:var(--foreground)] sm:text-4xl md:text-5xl">
            {currentReview.title}
          </h1>
          <p className="mt-2 text-base text-muted sm:text-lg">Review with line comments and AI feedback.</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <ReviewStatus
            value={currentReview.status}
            onChange={async (status) => {
              const { data } = await axiosInstance.patch(`/reviews/${currentReview._id}/status`, { status });
              setCurrentReview(data.review);
            }}
          />
          <Button
            variant="secondary"
            disabled={isRerunning}
            onClick={async () => {
              setIsRerunning(true);
              try {
                const { data } = await axiosInstance.post(`/reviews/${currentReview._id}/ai-rerun`);
                setCurrentReview({ ...currentReview, ...data });
                toast.success("AI review refreshed");
              } finally {
                setIsRerunning(false);
              }
            }}
            className="h-10 px-4"
          >
            <RefreshCw size={16} className={isRerunning ? "animate-spin" : ""} />
            Refresh
          </Button>
          {canDeleteReview ? (
            <DeleteButton
              pending={isDeleting}
              onClick={handleDeleteReview}
              label="Delete"
            />
          ) : null}
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <div className="card overflow-hidden">
            <CodeEditor
              value={currentReview.code}
              language={currentReview.language}
              readOnly
              suggestions={currentReview.aiSuggestions}
              correctedCode={currentReview.correctedCode}
            />
          </div>

          <section className="card p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border-2 border-[color:var(--edge)] bg-[color:var(--accent-quinary)]">
                <MessageCircle size={20} className="text-[#f7f1e6]" />
              </div>
              <h2 className="text-2xl font-black text-[color:var(--foreground)]">Comments</h2>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(300px,0.95fr)_minmax(0,1.25fr)] xl:items-start">
              <form
                className="space-y-5 rounded-[var(--radius-md)] border-2 border-[color:var(--line)] bg-[color:var(--surface-muted)] p-5"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!comment.trim()) return;
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
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-muted">
                    <Hash size={14} className="text-[color:var(--accent)]" />
                    Line (Optional)
                  </label>
                  <input
                    className="w-full text-sm"
                    placeholder="Line #"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-muted">
                    <MessageCircle size={14} className="text-[color:var(--accent)]" />
                    Comment
                  </label>
                  <textarea
                    className="min-h-[120px] w-full resize-y text-sm leading-relaxed"
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <Button type="submit" className="h-11 w-full text-base">
                  <Send size={16} />
                  Post
                </Button>
              </form>

              <div className="space-y-6">
                {groupedComments.lineComments.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">Line-specific</h3>
                    <div className="space-y-3">
                      {groupedComments.lineComments.map((item) => <LineComment key={item._id} comment={item} />)}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">General</h3>
                  <div className="space-y-3">
                    {groupedComments.generalComments.length > 0 ? (
                      groupedComments.generalComments.map((item) => <LineComment key={item._id} comment={item} />)
                    ) : (
                      <div className="rounded-[var(--radius-md)] border-2 border-dashed border-[color:var(--line)] px-5 py-6 text-center text-sm italic text-muted">
                        No comments yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <AIFeedback review={currentReview} />
        </aside>
      </div>
    </AppShell>
  );
}
