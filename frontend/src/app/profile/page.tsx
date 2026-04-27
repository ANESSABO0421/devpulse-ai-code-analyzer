"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ProjectStats } from "@/components/project/ProjectStats";
import { axiosInstance } from "@/lib/axios";
import { User, UserStats } from "@/types/user";
import { Review } from "@/types/review";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfilePage() {
  useAuth();
  const { updateUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats>({ reviewCount: 0, projectCount: 0, avgScore: 0 });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: "", avatar: "" });

  useEffect(() => {
    Promise.all([axiosInstance.get("/users/profile"), axiosInstance.get("/users/stats"), axiosInstance.get("/reviews", { params: { limit: 5 } })]).then(
      ([profileRes, statsRes, reviewsRes]) => {
        setUser(profileRes.data.user);
        setForm({ name: profileRes.data.user.name, avatar: profileRes.data.user.avatar || "" });
        setStats(statsRes.data);
        setReviews(reviewsRes.data.reviews);
      },
    );
  }, []);

  if (!user) {
    return <AppShell><div className="card p-6">Loading profile...</div></AppShell>;
  }

  return (
    <AppShell>
      <div className="card flex flex-col gap-6 p-6 md:flex-row md:items-center">
        <Avatar user={user} size={84} />
        <div>
          <h1 className="text-4xl font-black">{user.name}</h1>
          <p className="mt-2 text-[var(--muted)]">{user.email}</p>
          {user.githubUsername ? <p className="mt-1 text-[var(--accent)]">@{user.githubUsername}</p> : null}
        </div>
      </div>

      <ProjectStats
        items={[
          { label: "Reviews", value: stats.reviewCount },
          { label: "Projects", value: stats.projectCount },
          { label: "Avg Score", value: stats.avgScore },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <form
          className="card space-y-4 p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const { data } = await axiosInstance.patch("/users/profile", form);
            setUser(data.user);
            updateUser(data.user);
            toast.success("Profile updated");
          }}
        >
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Avatar URL" value={form.avatar} onChange={(event) => setForm({ ...form, avatar: event.target.value })} />
          <Button type="submit">Save Changes</Button>
        </form>
        <div className="card p-6">
          <h2 className="mb-5 text-2xl font-semibold">Recent activity</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
                <div className="font-semibold">{review.title}</div>
                <div className="mt-1 text-sm text-[var(--muted)]">
                  Score {review.aiScore} • {review.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
