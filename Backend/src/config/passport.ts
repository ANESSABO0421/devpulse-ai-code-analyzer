import dotenv from "dotenv";
import passport from "passport";
import { Profile, Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User";

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      callbackURL:
        process.env.GITHUB_CALLBACK_URL ||
        `http://localhost:${process.env.PORT || 5000}/api/v1/auth/github/callback`,
    },
    async (
      accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: Error | null, user?: Express.User | false) => void,
    ) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        const githubId = profile.id;

        let user = await User.findOne({
          $or: [{ githubId }, ...(email ? [{ email }] : [])],
        });

        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username || "GitHub User",
            email: email || `${githubId}@users.noreply.github.com`,
            avatar: profile.photos?.[0]?.value || "",
            githubId,
            githubUsername: profile.username,
            githubAccessToken: accessToken,
          });
        } else {
          user.name = profile.displayName || user.name;
          user.avatar = profile.photos?.[0]?.value || user.avatar;
          user.githubId = githubId;
          user.githubUsername = profile.username || user.githubUsername;
          user.githubAccessToken = accessToken;
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error as Error);
      }
    },
  ),
);

export default passport;
