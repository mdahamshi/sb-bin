import { Strategy as LocalStrategy } from "passport-local";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import { sanitizeUser } from "./sanitize.js";
import passport from "passport";
export function setupPassport() {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.user.getByUsername([username]);
        if (!user)
          return done(null, false, { error: "Please check your username" });
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match)
          return done(null, false, { error: "Please check your password" });

        return done(null, sanitizeUser(user));
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.user.getById([id]);

      done(null, sanitizeUser(user));
    } catch (err) {
      done(err);
    }
  });

  return passport;
}

export const generatePasswordHash = async (password) => {
  const res = await bcrypt.hash(password, 10);
  return res;
};

export const validatePassword = async (password, user) => {
  const match = await bcrypt.compare(password, user.password);
  return match;
};

export const authenticated = (req) => {
  return req.session?.passport?.user;
};
