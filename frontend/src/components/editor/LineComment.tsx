import { Comment } from "@/types/comment";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";

export function LineComment({ comment }: { comment: Comment }) {
  const author = typeof comment.authorId === "string" ? { name: "Teammate" } : comment.authorId;

  return (
    <article className="rounded-3xl border border-[color:var(--glass-border)] bg-[color:var(--glass)] p-5 shadow-[0_18px_40px_rgba(2,6,23,0.12)] backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <Avatar user={author} size={42} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="text-base font-semibold text-[color:var(--foreground)]">{author.name}</div>
            {comment.line ? (
              <span className="rounded-full border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
                Line {comment.line}
              </span>
            ) : (
              <span className="rounded-full border border-[color:var(--glass-border)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                General
              </span>
            )}
          </div>
          <div className="mt-1 text-xs text-muted">{formatDate(comment.createdAt)}</div>
          <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-[color:var(--foreground)]/92">
            {comment.content}
          </p>
        </div>
      </div>
    </article>
  );
}
