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
        <div className="rounded-xl border border-[#334155] bg-[#1E293B] flex h-64 flex-col items-center justify-center p-10 text-center">
          <RefreshCw size={32} className="mb-4 animate-spin text-[#3B82F6]" />
          <p className="text-[#94A3B8]">Loading review workspace...</p>
        </div>
      </AppShell>
    );
  }

  if (error || !currentReview) {
    return (
      <AppShell>
        <div className="rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/5 p-10 text-center">
          <AlertCircle size={48} className="mx-auto mb-6 text-[#EF4444]" />
          <h2 className="text-2xl font-bold text-[#F1F5F9]">Review not found</h2>
          <p className="mt-4 text-[#94A3B8]">
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
            <span className="rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#3B82F6]">
              {currentReview.language}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-[#F1F5F9] md:text-5xl">{currentReview.title}</h1>
          <p className="mt-2 text-lg text-[#94A3B8]">Review with line comments and AI feedback.</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
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
            className="h-10 px-4 font-semibold border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10"
          >
            <RefreshCw size={16} className={`mr-2 ${isRerunning ? "animate-spin" : ""}`} />
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
          <div className="overflow-hidden rounded-xl border border-[#334155] bg-[#1E293B]">
            <CodeEditor
              value={currentReview.code}
              language={currentReview.language}
              readOnly
              suggestions={currentReview.aiSuggestions}
            />
          </div>

          <section className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/10">
                <MessageCircle size={20} className="text-[#3B82F6]" />
              </div>
              <h2 className="text-2xl font-bold text-[#F1F5F9]">Comments</h2>
            </div>
            
            <div className="grid gap-6 xl:grid-cols-[minmax(300px,0.95fr)_minmax(0,1.25fr)] xl:items-start">
              <form
                className="space-y-5 rounded-xl border border-[#334155] bg-[#0F172A] p-5"
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
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
                    <Hash size={14} className="text-[#3B82F6]" />
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
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
                    <MessageCircle size={14} className="text-[#3B82F6]" />
                    Comment
                  </label>
                  <textarea 
                    className="min-h-[120px] w-full resize-y text-sm leading-relaxed" 
                    placeholder="Share your thoughts..." 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                  />
                </div>
                <Button type="submit" className="h-11 w-full text-base font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                  <Send size={16} className="mr-2" />
                  Post
                </Button>
              </form>

              <div className="space-y-6">
                {groupedComments.lineComments.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">Line-specific</h3>
                    <div className="space-y-3">
                      {groupedComments.lineComments.map((item) => <LineComment key={item._id} comment={item} />)}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">General</h3>
                  <div className="space-y-3">
                    {groupedComments.generalComments.length > 0 ? (
                      groupedComments.generalComments.map((item) => <LineComment key={item._id} comment={item} />)
                    ) : (
                      <div className="rounded-xl border border-dashed border-[#334155] bg-[#0F172A] px-5 py-6 text-sm italic text-[#94A3B8] text-center">
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
