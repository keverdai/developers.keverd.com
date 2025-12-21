import { Navbar } from "../components/Navbar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-keverd-sand/20">
      <Navbar />
      {children}
    </div>
  );
}

