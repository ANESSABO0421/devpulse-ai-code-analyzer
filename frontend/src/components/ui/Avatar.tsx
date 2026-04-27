import Image from "next/image";
import { User } from "@/types/user";

export function Avatar({ user, size = 40 }: { user?: Partial<User> | string; size?: number }) {
  const name = typeof user === "string" ? user : user?.name || "DevPulse";
  const image = typeof user === "string" ? "" : user?.avatar || "";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        unoptimized
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-[var(--accent)] font-semibold text-white"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}
