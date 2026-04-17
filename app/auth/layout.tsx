import { PageTransition } from "@/components/layout/page-transition";
import { SkipToContent } from "@/components/layout/skip-to-content";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-clip bg-background">
      <SkipToContent />
      <main id="main-content" tabIndex={-1} className="min-h-full outline-none">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
