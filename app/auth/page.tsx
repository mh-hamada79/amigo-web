"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      router.push("/home");
    } catch (err: any) {
      setMsg(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "60px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>AMIGO</h1>
      <p style={{ opacity: 0.8, marginBottom: 20 }}>
        {mode === "signin" ? "Sign in" : "Create account"} (email + password)
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #333",
            background: "transparent",
            color: "white",
          }}
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #333",
            background: "transparent",
            color: "white",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #444",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Please wait..."
            : mode === "signin"
            ? "Sign in"
            : "Create account"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #333",
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          {mode === "signin"
            ? "Need an account? Create one"
            : "Have an account? Sign in"}
        </button>

        {msg ? (
          <p style={{ color: "#ff6b6b", marginTop: 6, whiteSpace: "pre-wrap" }}>
            {msg}
          </p>
        ) : null}
      </form>
    </main>
  );
}
