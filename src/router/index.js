import { createBrowserRouter } from "react-router-dom";
import { loginLoader, rootLoader } from "./loader";

// APP
import App from "../App";

// LAYOUT
import BaseLayout from "../layout/BaseLayout";

// PAGES
import Login from "../pages/Login";
import Dashbroad from "../pages/Dashbroad";

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