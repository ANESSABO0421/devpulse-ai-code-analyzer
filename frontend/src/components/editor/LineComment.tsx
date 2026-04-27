import { Comment } from "@/types/comment";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";

export function LineComment({ comment }: { comment: Comment }) {
  const author = typeof comment.authorId === "string" ? { name: "Teammate" } : comment.authorId;

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4">
      <div className="mb-2 flex items-center gap-3">
        <Avatar user={author} size={34} />
        <div>
          <div className="font-medium">{author.name}</div>
          <div className="text-xs text-[var(--muted)]">{formatDate(comment.createdAt)}</div>
        </div>
      </div>
      {comment.line ? <div className="mb-2 text-xs font-semibold text-[var(--accent)]">Line {comment.line}</div> : null}
      <p className="text-sm leading-6">{comment.content}</p>
    </div>
  );
}
