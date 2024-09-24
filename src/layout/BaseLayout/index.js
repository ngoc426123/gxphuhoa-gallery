import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

// COMPONENT
import UploadButtonTopbar from "../../modules/UploadButtonTopbar";
import UploadProgressPopup from "../../modules/UploadProgressPopup";
import ManageFilesTools from "../../modules/ManageFilesTools";

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
        <ManageFilesTools />
        <div className={cls.sideContent} data-side-content>
          <div className={cls.topBar} data-top-bar>
            <UploadButtonTopbar />
          </div>
          <div className={cls.mainContent} data-main-content>
            <Outlet />
          </div>
        </div>
      </div>
      <UploadProgressPopup />
    </>
  )
}