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
        className="!z-[100]"
        toastOptions={{
          classNames: {
            toast:
              "rounded-2xl border-border shadow-lg !py-3 !gap-3 min-h-[3.25rem] items-center",
            title: "font-semibold text-deep",
            description: "text-muted text-sm",
            actionButton:
              "rounded-lg font-semibold !bg-primary !text-primary-foreground",
            cancelButton: "rounded-lg font-medium",
          },
        }}
      />
    </>
  );
}
