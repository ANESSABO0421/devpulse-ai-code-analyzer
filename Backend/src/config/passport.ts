import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
            githubId: profile.id,
            githubUsername: profile.username,
            githubAccessToken: accessToken,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
