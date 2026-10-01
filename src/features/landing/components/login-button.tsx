"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context";

export function LoginButton(props: ComponentProps<typeof Button>) {
  const { openLogin } = useAuth();
  return <Button {...props} onClick={openLogin} />;
}
