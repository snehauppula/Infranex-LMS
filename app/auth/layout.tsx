export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-clip bg-background">
      {children}
    </div>
  );
}
