import { metadata } from "./metadata";

export { metadata };

export default function VueDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

