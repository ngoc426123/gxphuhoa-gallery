import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useCallback, useEffect } from "react";
import axios from "axios";

// REDUX
import { setConfig } from "../../store/root";
import { useDispatch } from "react-redux";

// COMPONENT
import UploadHandle from "../../modules/UploadHandle";
import ManageFilesTools from "../../modules/ManageFilesTools";

export default function BaseLayout() {
  // STATE
  const dispatch = useDispatch();

  // METHOD
  const getConfig = useCallback(async () => {
    try {
      const apiURL = process.env.REACT_APP_API + '/options';
      const { data } = await axios.get(apiURL);

      dispatch(setConfig(data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  // SIDE EFFECT
  useEffect(() => {
    getConfig();
  }, [getConfig]);

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