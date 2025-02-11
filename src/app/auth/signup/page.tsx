"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import createUser from "./create_user";
import NextLink from "next/link";
import { useActionState } from "react";

export default function Signup(){
  const [formState, formAction] = useActionState(createUser, { error: ""});
  return(
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          name='email'
          label='Email'
          variant="outlined"
          type="email"
          helperText={formState.error}
          error={Boolean(formState.error)}
        />
        <TextField
          name='username'
          label='Username'
          variant="outlined"
          type="text"
          helperText={formState.error}
          error={Boolean(formState.error)}
        />
        <TextField
          name='password'
          label="Password"
          variant="outlined"
          type="password"
          helperText={formState.error}
          error={Boolean(formState.error)}
        />
        <Button type="submit" variant="contained">
          Signup
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center">
          Login
        </Link>
      </Stack>
    </form>
  )
}