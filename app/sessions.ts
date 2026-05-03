import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
  jwtToken: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        maxAge: 3600,
      },
    },
  );

export { getSession, commitSession, destroySession };
