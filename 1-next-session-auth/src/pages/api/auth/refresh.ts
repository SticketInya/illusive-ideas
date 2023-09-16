import { cookieName, generateCookie } from "@/lib";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function refresh(req: NextApiRequest, res: NextApiResponse) {
  const sessionCookie = req.cookies[cookieName];
  if (!sessionCookie) {
    return res.status(400).send("Missing cookie");
  }

  res.setHeader(
    "Set-Cookie",
    generateCookie({
      name: cookieName,
      value: sessionCookie,
      path: "/",
      sameSite: "lax",
      maxAge: 1000 * 60 * 10,
    }),
  );
  res.status(200).send({ success: true });
}
