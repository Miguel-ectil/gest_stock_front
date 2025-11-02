"use client";
import Sidebar from "@/layout/Sidebar";
import Header from "@/layout/Header";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"
          }`}
      >
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
