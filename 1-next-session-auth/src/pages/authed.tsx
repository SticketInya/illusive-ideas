import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function AuthedPage() {
  const router = useRouter();
  const { logout } = useAuth({ onUnAuthenticated: () => router.push("/") });
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <h2>This is an authed page.</h2>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}
