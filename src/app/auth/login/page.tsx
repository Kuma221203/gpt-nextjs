"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import login from "./login";
import { useActionState } from "react";
import { useEffect, useState } from "react";

export default function Login() {
  const [state, formAction] = useActionState(login, { error: "" });

  // Sử dụng useState để lưu `redirect` và cập nhật sau khi client render
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setRedirectTo(searchParams.get("redirect") || "/");
    }
  }, []);

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <input type="hidden" name="redirect" value={redirectTo || "/"} />
        <TextField
          error={!!state.error}
          helperText={state.error}
          name="email"
          label="Email"
          variant="outlined"
          type="email"
        />
        <TextField
          error={!!state.error}
          helperText={state.error}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  );
}
