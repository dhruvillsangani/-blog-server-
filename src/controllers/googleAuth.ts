import passport from "passport";
import * as dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
dotenv.config();
import { logger } from "../config/logger_config";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      // Here we are storing login info in database

      logger.info(accessToken);
      logger.info(refreshToken);
      logger.info(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
