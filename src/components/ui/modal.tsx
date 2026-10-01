"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./button";

export function Modal({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const dialog = ref.current;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    const first = dialog?.querySelector<HTMLElement>(
      "input, textarea, select, [data-initial-focus]",
    );
    first?.focus();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="relative p-6 sm:p-7">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Tutup dialog"
          className="absolute right-3 top-3"
        >
          <X size={18} />
        </Button>
        <h2
          id={titleId}
          className="pr-7 text-[22px] font-bold leading-snug tracking-tight"
        >
          {title}
        </h2>
        {description && (
          <p id={descriptionId} className="mb-6 mt-2 text-sm text-muted">
            {description}
          </p>
        )}
        {children}
      </div>
    </dialog>
  );
}
