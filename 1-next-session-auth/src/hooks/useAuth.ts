"use client";

import { cookieName } from "@/lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type authState = "auth" | "unauth" | "pending";
interface Options {
  onUnAuthenticated?: Function;
}

export function useAuth(opts: Options = {}) {
  const router = useRouter();
  const [state, setState] = useState<authState>("pending");
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const regex = new RegExp(
      "(?:(?:^|.*;\\s*)" + cookieName + "\\s*\\=\\s*([^;]*).*$)|^.*$",
    );
    const cookie = document.cookie.replace(regex, "$1");
    setState(cookie ? "auth" : "unauth");
  }, []);

  useEffect(() => {
    if (state !== "unauth" || typeof opts.onUnAuthenticated === "undefined") {
      return;
    }
    opts.onUnAuthenticated();
  }, [state]);

  async function login() {
    return await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@mail.to",
        password: "secret123",
      }),
    });
  }

  async function logout(redirect: string | undefined = undefined) {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (redirect) {
        router.push(redirect);
      }
      setState("unauth");
    } catch (error) {
      console.error(error);
    }
  }

  return { isAuthenticated: state, login, logout };
}
