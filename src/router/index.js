import { createBrowserRouter } from "react-router-dom";

// LAYOUT
import App from "../App";

// PAGES
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
]);

export default router;