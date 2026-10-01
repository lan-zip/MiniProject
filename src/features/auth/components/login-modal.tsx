"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FormField, Input } from "@/components/ui/form-field";

export function LoginModal({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: (nim: string, password: string) => boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!nim.trim() || !password) {
      setError("NIM dan password wajib diisi.");
      return;
    }
    if (!onLogin(nim, password)) setError("NIM atau password salah");
  }
  return (
    <Modal
      title="Masuk ke CampusSpace"
      description="Satu langkah untuk kampus yang lebih nyaman."
      onClose={onClose}
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        {error && (
          <p
            id="login-error"
            className="rounded-control bg-danger-soft px-3 py-2 text-sm text-danger"
            role="alert"
          >
            {error}
          </p>
        )}
        <FormField id="nim" label="NIM">
          <Input
            id="nim"
            name="nim"
            inputMode="numeric"
            autoComplete="username"
            placeholder="Masukkan NIM"
            required
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
          />
        </FormField>
        <FormField id="password" label="Password">
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Masukkan password"
              className="pr-24"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "login-error" : undefined}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 text-xs font-semibold text-primary"
              aria-label={
                showPassword ? "Sembunyikan password" : "Lihat password"
              }
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Sembunyi" : "Lihat"}
            </button>
          </div>
        </FormField>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit">
            Masuk <ArrowRight size={16} />
          </Button>
        </div>
      </form>
    </Modal>
  );
}
