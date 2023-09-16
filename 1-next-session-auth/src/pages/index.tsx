import Image from "next/image";
import { Inter } from "next/font/google";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h2>This is the homepage.</h2>
      <button
        onClick={async () => {
          try {
            await login();
            router.push("/authed");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        login
      </button>
    </main>
  );
}
