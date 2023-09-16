import { cookieName, generateCookie } from "@/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default function logout(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    generateCookie({
      name: cookieName,
      value: "deleted",
      path: "/",
      sameSite: "lax",
      maxAge: -1,
    }),
  );
  res.status(204).end();
}
