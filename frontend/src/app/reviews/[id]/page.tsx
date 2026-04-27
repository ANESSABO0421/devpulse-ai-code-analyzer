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
import { RefreshCw, MessageCircle, Hash, Send, AlertCircle } from "lucide-react";

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
  const [isRerunning, setIsRerunning] = useState(false);

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
    return (
      <AppShell>
        <div className="glass-card flex h-64 flex-col items-center justify-center p-10 text-center">
          <RefreshCw size={32} className="mb-4 animate-spin text-accent" />
          <p className="text-muted">Loading review workspace...</p>
        </div>
      </AppShell>
    );
  }

  if (error || !currentReview) {
    return (
      <AppShell>
        <div className="glass-card border-rose-500/20 bg-rose-500/5 p-10 text-center">
          <AlertCircle size={48} className="mx-auto mb-6 text-rose-500" />
          <h2 className="text-2xl font-bold text-white">Review not found</h2>
          <p className="mt-4 text-muted">
            {error || "This review may have been deleted or moved to another workspace."}
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-accent border border-accent/20">
              {currentReview.language}
            </span>
          </div>
          <h1 className="text-4xl font-black text-white md:text-5xl">{currentReview.title}</h1>
          <p className="mt-4 text-lg text-muted">Review live with line comments, AI feedback, and a shared status.</p>
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
          >
            <RefreshCw size={16} className={`mr-2 ${isRerunning ? "animate-spin" : ""}`} />
            Refresh AI
          </Button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
            <CodeEditor
              value={currentReview.code}
              language={currentReview.language}
              readOnly
              suggestions={currentReview.aiSuggestions}
            />
          </div>

          <section className="glass-card p-8">
            <div className="mb-8 flex items-center gap-3">
              <MessageCircle size={24} className="text-accent" />
              <h2 className="text-2xl font-bold text-white">Collaboration</h2>
            </div>
            
            <div className="grid gap-10 lg:grid-cols-[400px_1fr]">
              <form
                className="space-y-6"
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
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted opacity-60">
                    <Hash size={12} />
                    Specific Line (Optional)
                  </label>
                  <input 
                    className="w-full text-sm" 
                    placeholder="Line #" 
                    value={line} 
                    onChange={(e) => setLine(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted opacity-60">
                    <MessageCircle size={12} />
                    Your Feedback
                  </label>
                  <textarea 
                    className="min-h-[140px] w-full text-sm leading-relaxed" 
                    placeholder="Share your thoughts..." 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send size={16} className="mr-2" />
                  Post Comment
                </Button>
              </form>

              <div className="space-y-10">
                {groupedComments.lineComments.length > 0 && (
                  <div>
                    <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-muted opacity-60">Line-specific</h3>
                    <div className="space-y-4">
                      {groupedComments.lineComments.map((item) => <LineComment key={item._id} comment={item} />)}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-muted opacity-60">General Discussion</h3>
                  <div className="space-y-4">
                    {groupedComments.generalComments.length > 0 ? (
                      groupedComments.generalComments.map((item) => <LineComment key={item._id} comment={item} />)
                    ) : (
                      <p className="text-sm text-muted italic">No general comments yet. Be the first to start the thread!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <AIFeedback review={currentReview} />
        </aside>
      </div>
    </AppShell>
  );
}
