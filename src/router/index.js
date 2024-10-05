import { loginLoader, rootLoader } from "./loader";

// APP
import App from "../App";

// LAYOUT
import BaseLayout from "../layout/BaseLayout";

// PAGES
import Login from "../pages/Login";
import Dashbroad from "../pages/Dashbroad";
import Images from "../pages/Images";
import Albums from "../pages/Albums";
import AlbumsDetail from "../pages/AlbumsDetail";
import AlbumsCreate from "../pages/AlbumsCreate";
import Config from "../pages/Config";
import UploadFiles from "../pages/UploadFiles";

export const defineRouter = [
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
            path: 'images',
            element: <Images />,
          },
          {
            path: 'albums',
            children: [
              {
                path: '',
                element: <Albums />,
              },
              {
                path: ':albumId',
                element: <AlbumsDetail/>
              },
              {
                path: 'create',
                element: <AlbumsCreate />
              }
            ]
          },
          {
            path: 'config',
            element: <Config />,
          },
          {
            path: 'upload-files',
            element: <UploadFiles />
          }
        ]
      },
      {
        path: 'login',
        element: <Login />,
        loader: loginLoader,
      }
    ]
  }
];
