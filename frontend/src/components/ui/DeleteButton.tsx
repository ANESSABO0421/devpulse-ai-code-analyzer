"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  pending?: boolean;
  className?: string;
  label?: string;
}

export function DeleteButton({
  onClick,
  disabled = false,
  pending = false,
  className,
  label = "Delete",
}: DeleteButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      disabled={disabled || pending}
      onClick={onClick}
      className={cn(
        "border-rose-500/20 bg-rose-500/8 text-rose-300 hover:border-rose-500/30 hover:bg-rose-500/12 hover:text-rose-200",
        className,
      )}
    >
      <Trash2 size={16} className="mr-2" />
      {pending ? "Deleting..." : label}
    </Button>
  );
}
