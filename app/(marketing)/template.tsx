import { MarketingMotionTemplate } from "@/components/layout/marketing-motion-template";

export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingMotionTemplate>{children}</MarketingMotionTemplate>;
}
