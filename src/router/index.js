import { createBrowserRouter } from "react-router-dom";
import { loginLoader, rootLoader } from "./loader";

// APP
import App from "../App";

// LAYOUT
import BaseLayout from "../layout/BaseLayout";

// PAGES
import Login from "../pages/Login";
import Dashbroad from "../pages/Dashbroad";
import Albums from "../pages/Albums";
import AlbumsDetail from "../pages/AlbumsDetail";
import Config from "../pages/Config";
import UploadFiles from "../pages/UploadFiles";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <BaseLayout />,
        loader: rootLoader,
        children: [
          {
            path: '',
            element: <Dashbroad />,
          },
          {
            path: '/albums',
            element: <Albums />,
          },
          {
            path: 'album/:albumId',
            element: <AlbumsDetail/>
          },
          {
            path: '/config',
            element: <Config />,
          },
          {
            path: '/upload-files',
            element: <UploadFiles />
          }
        ]
      },
      {
        path: '/login',
        element: <Login />,
        loader: loginLoader,
      }
    ]
  }
]);

export default router;