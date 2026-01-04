"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/auth");
      else setEmail(user.email);
    });
    return () => unsub();
  }, [router]);

  return (
    <main style={{ maxWidth: 520, margin: "60px auto", padding: 16 }}>
      <h1 style={{ fontSize: 26, marginBottom: 8 }}>Home</h1>
      <p style={{ opacity: 0.85, marginBottom: 20 }}>
        Logged in as: <b>{email ?? "..."}</b>
      </p>

      <button
        onClick={async () => {
          await signOut(auth);
          router.replace("/auth");
        }}
        style={{
          padding: 12,
          borderRadius: 12,
          border: "1px solid #444",
          background: "#111",
          color: "white",
          cursor: "pointer",
        }}
      >
        Sign out
      </button>
    </main>
  );
}
