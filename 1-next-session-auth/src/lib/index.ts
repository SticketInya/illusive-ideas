import { randomBytes } from "crypto";
import { serialize } from "cookie";

export const cookieName = "my_auth_cookie";

export const tokenSecret = "yn17vypHkqyRZxJ+tLOWu0LlFwk/W2jovyphktLOWu0";

export function generateSessionToken() {
  return randomBytes(32)
    .toString("base64")
    .replaceAll("/", "_")
    .replaceAll("+", "-");
}

export interface SessionCookie {
  name: string;
  value: string;
  path: string;
  sameSite: true | "lax" | "strict" | "none";
  maxAge?: number;
}
export function generateCookie(cookieData: SessionCookie) {
  return serialize(cookieData.name, cookieData.value, {
    ...cookieData,
  });
}
