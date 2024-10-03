import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

// COMPONENT
import UploadHandle from "../../modules/UploadHandle";
import ManageFilesTools from "../../modules/ManageFilesTools";

export default function BaseLayout() {
  // CLASS
  const cls = {
    layout: 'h-full relative',
    sideContent: 'w-full min-h-full pl-72 overflow-hidden overflow-y-auto',
    topBar: 'flex justify-end py-3 px-8',
    mainContent: 'py-3 px-8',
  }

  // RENDER
  return (
    <>
      <div className={cls.layout} data-base-layout>
        <Sidebar />
        <ManageFilesTools />
        <div className={cls.sideContent} data-side-content>
          <div className={cls.topBar} data-top-bar>
          <UploadHandle />
          </div>
          <div className={cls.mainContent} data-main-content>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}