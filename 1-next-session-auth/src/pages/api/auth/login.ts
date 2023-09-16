import {
  cookieName,
  generateCookie,
  generateSessionToken,
  tokenSecret,
} from "@/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(400).send("Invalid request method");
  }
  const { email, password } = req.body;
  console.log(email, password, req.body);
  if (!email || !password) {
    return res.status(400).send("Missing parameters in body");
  }

  const cookie = generateCookie({
    name: cookieName,
    value: generateSessionToken(),
    path: "/",
    sameSite: "lax",
    maxAge: 1000 * 60 * 30,
  });

  res.setHeader("Set-Cookie", cookie);
  res.status(200).send({ success: true });
}
