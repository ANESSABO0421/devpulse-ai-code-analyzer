"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { axiosInstance } from "@/lib/axios";
import { User, UserStats } from "@/types/user";
import { Review } from "@/types/review";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Award,
  BarChart3,
  Briefcase,
  Calendar,
  ExternalLink,
  FileText,
  GitBranch,
  Mail,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

function getScoreColor(score: number) {
  if (score >= 80) return "var(--success)";
  if (score >= 50) return "var(--warning)";
  return "var(--danger)";
}

function getMemberSince(date?: string) {
  if (!date) return "Recently joined";
  return new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ProfilePage() {
  useAuth();
  const { updateUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats>({ reviewCount: 0, projectCount: 0, avgScore: 0 });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: "", avatar: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      axiosInstance.get("/users/profile"),
      axiosInstance.get("/users/stats"),
      axiosInstance.get("/reviews", { params: { limit: 8 } }),
    ]).then(([profileRes, statsRes, reviewsRes]) => {
      setUser(profileRes.data.user);
      setForm({ name: profileRes.data.user.name, avatar: profileRes.data.user.avatar || "" });
      setStats(statsRes.data);
      setReviews(reviewsRes.data.reviews);
    });
  }, []);

  if (!user) {
    return (
      <AppShell>
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[color:var(--accent)]/30" style={{ animation: "loaderOrbit 2s linear infinite" }} />
            <div className="h-3 w-3 rounded-full bg-[var(--accent)]" style={{ animation: "loaderDot 1s ease-in-out infinite" }} />
          </div>
          <p className="text-sm text-[color:var(--muted)]">Loading your profile...</p>
        </div>
      </AppShell>
    );
  }

  const achievements = [
    { icon: Star, label: "First Review", earned: stats.reviewCount >= 1 },
    { icon: TrendingUp, label: "10 Reviews", earned: stats.reviewCount >= 10 },
    { icon: Award, label: "High Scorer", earned: stats.avgScore >= 80 },
    { icon: Zap, label: "Power User", earned: stats.projectCount >= 3 },
  ];

  return (
    <AppShell>
      {/* Hero banner */}
      <div className="premium-card overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent-secondary)]/15 to-[var(--accent-tertiary)]/10">
          <div className="absolute inset-0 opacity-30 bg-grid" />
        </div>
        <div className="relative px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-5">
              <div className="rounded-full ring-4 ring-[color:var(--background)]">
                <Avatar user={user} size={96} />
              </div>
              <div className="pb-1">
                <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{user.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} />
                    {user.email}
                  </span>
                  {user.githubUsername ? (
                    <a
                      href={`https://github.com/${user.githubUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-[color:var(--accent)] transition-colors hover:underline"
                    >
                      <GitBranch size={14} />
                      @{user.githubUsername}
                      <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge-glow">Pro Member</span>
              <span className="flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--muted)]">
                <Calendar size={12} />
                Joined {getMemberSince(user.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: FileText, label: "Total Reviews", value: stats.reviewCount, color: "var(--accent)" },
          { icon: Briefcase, label: "Projects", value: stats.projectCount, color: "var(--accent-secondary)" },
          { icon: BarChart3, label: "Avg Score", value: stats.avgScore, color: getScoreColor(stats.avgScore) },
          { icon: TrendingUp, label: "Completion Rate", value: reviews.length ? `${Math.round((reviews.filter((r) => r.status === "resolved" || r.status === "reviewed").length / reviews.length) * 100)}%` : "—", color: "var(--success)" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="stat-pill">
            <div className="flex items-center justify-between">
              <Icon size={18} style={{ color }} />
              <span className="font-display text-3xl font-extrabold" style={{ color }}>{value}</span>
            </div>
            <span className="text-sm text-[color:var(--muted)]">{label}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Edit profile */}
          <form
            className="premium-card p-6"
            onSubmit={async (event) => {
              event.preventDefault();
              setSaving(true);
              try {
                const { data } = await axiosInstance.patch("/users/profile", form);
                setUser(data.user);
                updateUser(data.user);
                toast.success("Profile updated");
              } finally {
                setSaving(false);
              }
            }}
          >
            <h2 className="font-display text-xl font-bold">Edit Profile</h2>
            <p className="mt-1 text-sm text-[color:var(--muted)]">Update your public information</p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">Display Name</label>
                <input className="w-full" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">Avatar URL</label>
                <input className="w-full" placeholder="https://..." value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>

          {/* Achievements */}
          <div className="premium-card p-6">
            <h2 className="font-display text-xl font-bold">Achievements</h2>
            <p className="mt-1 text-sm text-[color:var(--muted)]">Milestones unlocked on your journey</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {achievements.map(({ icon: Icon, label, earned }) => (
                <div
                  key={label}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                    earned
                      ? "border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)]"
                      : "border-[color:var(--line)] opacity-40 grayscale"
                  }`}
                >
                  <Icon size={22} className={earned ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"} />
                  <span className="text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="premium-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-soft)]">
                <Shield size={18} className="text-[color:var(--accent)]" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Security</h2>
                <p className="text-sm text-[color:var(--muted)]">Account protection status</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { label: "Email verified", status: true },
                { label: "GitHub connected", status: !!user.githubUsername },
                { label: "Two-factor auth", status: false },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-[color:var(--line)] px-4 py-3">
                  <span className="text-sm">{label}</span>
                  <Badge tone={status ? "success" : "neutral"}>{status ? "Active" : "Pending"}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — activity */}
        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">Recent Activity</h2>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Your latest code reviews</p>
            </div>
            <Link href="/reviews">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <FileText size={32} className="text-[color:var(--muted)]/40" />
                <p className="text-sm text-[color:var(--muted)]">No reviews yet. Start your first review!</p>
                <Link href="/reviews/new">
                  <Button size="sm">New Review</Button>
                </Link>
              </div>
            ) : (
              reviews.map((review) => (
                <Link
                  key={review._id}
                  href={`/reviews/${review._id}`}
                  className="group flex items-center justify-between rounded-xl border border-[color:var(--line)] p-4 transition-all hover:border-[color:var(--accent)]/30 hover:bg-[color:var(--accent-soft)]"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold group-hover:text-[color:var(--accent)]">{review.title}</p>
                    <p className="mt-0.5 text-xs text-[color:var(--muted)]">
                      {review.language} • {review.status}
                    </p>
                  </div>
                  <div className="ml-4 flex shrink-0 items-center gap-3">
                    <span
                      className="font-display text-lg font-extrabold"
                      style={{ color: getScoreColor(review.aiScore) }}
                    >
                      {review.aiScore}
                    </span>
                    <ExternalLink size={14} className="text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
