import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface MainLayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

export const MainLayout = ({ children, hideHeader = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {!hideHeader && <Header />}
      <main className="pb-24">{children}</main>
      <BottomNav />
    </div>
  );
};
