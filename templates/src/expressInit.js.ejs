import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool.js";
import { setupPassport } from "./utils/passport.js";
import passport from "passport";

const pgSession = connectPgSimple(session);
setupPassport();

export default function expressInit(app) {
  app.use(
    session({
      store: new pgSession({
        pool: pool,
        tableName: "session",
        createTableIfMissing: true,
      }),
      secret:
        process.env.SESSION_SECRET ||
        "6907e5e5ba254bd519e1c56d0e57aa1983aae626d47714f0053ee498169339e2",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production", // true in prod with HTTPS
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
