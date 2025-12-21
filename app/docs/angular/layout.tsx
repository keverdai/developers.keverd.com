import { metadata } from "./metadata";

export { metadata };

export default function AngularDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

