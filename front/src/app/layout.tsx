import { SessionContextProvider } from "@/contexts/SessionContext";
import "./globals.css";

export const metadata = {
  title: "👾 meeting planner",
  description: "👾 meeting planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionContextProvider>{children}</SessionContextProvider>
      </body>
    </html>
  );
}
