import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

function AppLayout() {
  return (
    <div className="min-h-screen w-full bg-[#12131A] text-[#F5F3EF]">
      <main className="min-h-screen w-full">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-[#12131A] text-[#F5F3EF] border-t border-[#2C2E3D]">
        My App. All rights reserved.
      </div>
    </div>
  );
}

export default AppLayout;