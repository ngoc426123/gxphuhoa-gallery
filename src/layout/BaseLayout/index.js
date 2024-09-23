import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

// COMPONENT


export default function BaseLayout() {
  // CLASS
  const cls = {
    layout: 'flex items-stretch h-full'
  }

  // RENDER
  return (
    <div className={cls.layout} data-base-layout>
      <Sidebar />
      <Outlet />
    </div>
  )
}