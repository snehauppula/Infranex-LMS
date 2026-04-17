"use client";

import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        richColors
        position="top-right"
        closeButton
        offset="1rem"
        toastOptions={{
          classNames: {
            toast: "rounded-2xl border-border shadow-lg",
          },
        }}
      />
    </>
  );
}
