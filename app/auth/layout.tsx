export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-clip bg-gradient-to-br from-background via-white/90 to-primary/[0.07]">
      {children}
    </div>
  );
}
