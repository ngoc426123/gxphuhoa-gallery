import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

// COMPONENT
import UploadTopbar from "../../modules/UploadTopbar";
import UploadProgressPopup from "../../modules/UploadProgressPopup";

export default function BaseLayout() {
  // CLASS
  const cls = {
    layout: 'flex items-stretch h-full',
    sideContent: 'w-full min-h-full overflow-hidden overflow-y-auto',
    topBar: 'flex justify-end py-3 px-5 pl-8',
    mainContent: 'py-3 px-5 pl-8',
  }

  // RENDER
  return (
    <>
      <div className={cls.layout} data-base-layout>
        <Sidebar />
        <div className={cls.sideContent}>
          <div className={cls.topBar}>
            <UploadTopbar />
          </div>
          <div className={cls.mainContent}>
            <Outlet />
          </div>
        </div>
      </div>
      <UploadProgressPopup />
    </>
  )
}