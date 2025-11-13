"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

// === Zod Schema ===
const registerSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9._]{5,}$/, "Min 5 characters (letters, numbers, . or _)"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

const loginSchema = z.object({
  identifier: z.string().min(1, "Username or email required"),
  password: z.string().min(1, "Password required"),
});

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const loginForm = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: { identifier: "", password: "" },
    onSubmit: async ({ value }) => {
      console.log("Login data:", value);
      alert("Login success!");
    },
  });

  const signupForm = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: { username: "", email: "", password: "", confirm: "" },
    onSubmit: async ({ value }) => {
      console.log("Signup data:", value);
      alert("Signup success!");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#ffffff0f] border border-[#ffffff1a] backdrop-blur-md rounded-2xl p-8 w-[90%] max-w-md relative shadow-2xl text-white">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* === LOGIN MODE === */}
        {mode === "login" && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Log In</h2>
            <form
              className="w-full space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                loginForm.handleSubmit();
              }}
            >
              {/* Username / Email */}
              <loginForm.Field
                name="identifier"
                validators={{ onChange: loginSchema.shape.identifier }}
              >
                {(field) => (
                  <div>
                    <input
                      type="text"
                      placeholder="Username or Email Address"
                      className="w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-red-400 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </loginForm.Field>

              {/* Password */}
              <loginForm.Field
                name="password"
                validators={{ onChange: loginSchema.shape.password }}
              >
                {(field) => (
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-red-400 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </loginForm.Field>

              <button
                type="submit"
                disabled={loginForm.state.isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {loginForm.state.isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-300">
              New to <span className="font-bold">DBMSATRIA</span>?{" "}
              <button
                type="button"
                className="font-bold hover:text-blue-400"
                onClick={() => setMode("signup")}
              >
                Sign up now.
              </button>
            </p>
          </div>
        )}

        {/* === SIGN UP MODE === */}
        {mode === "signup" && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form
              className="w-full space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                signupForm.handleSubmit();
              }}
            >
              <signupForm.Field
                name="username"
                validators={{ onChange: registerSchema.shape.username }}
              >
                {(field) => (
                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-red-400 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </signupForm.Field>

              <signupForm.Field
                name="email"
                validators={{ onChange: registerSchema.shape.email }}
              >
                {(field) => (
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-red-400 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </signupForm.Field>

              <signupForm.Field
                name="password"
                validators={{ onChange: registerSchema.shape.password }}
              >
                {(field) => (
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-red-400 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </signupForm.Field>

              <signupForm.Field
                name="confirm"
                validators={{ onChange: registerSchema.shape.confirm }}
              >
                {(field) => (
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-red-400 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </signupForm.Field>

              <button
                type="submit"
                disabled={signupForm.state.isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {signupForm.state.isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-300">
              Already have an account?{" "}
              <button
                type="button"
                className="font-bold hover:text-blue-400"
                onClick={() => setMode("login")}
              >
                Log in now.
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}