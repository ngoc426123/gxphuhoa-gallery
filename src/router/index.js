import { createBrowserRouter } from "react-router-dom";
import { loginLoader, rootLoader } from "./loader";

// LAYOUT
import App from "../App";

// PAGES
import Login from "../pages/Login";
import Dashbroad from "../pages/Dashbroad";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Dashbroad />,
        loader: rootLoader,
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