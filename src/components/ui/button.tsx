import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger"
    | "danger-solid"
    | "inverse"
    | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
};
export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={cn("btn", `btn-${variant}`, `btn-${size}`, className)}
      {...props}
    />
  );
}
