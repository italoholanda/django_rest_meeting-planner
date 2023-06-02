import { SessionContextProvider } from "@/contexts/SessionContext";
import "./globals.css";
import BasePage from "@/components/BasePage";
import ContentBox from "@/components/ContentBox";

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
        <BasePage>
          <SessionContextProvider>{children}</SessionContextProvider>
        </BasePage>
        <div id="portals"></div>
      </body>
    </html>
  );
}
