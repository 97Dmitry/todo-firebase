import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppRoutes } from "constants/routes";
import MainLayout from "Layout/MainLayout/MainLayout";
import { Dashboard, Task } from "pages";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: AppRoutes.TASK(),
        element: <Task />,
      },
      { path: "*", element: <Navigate to={AppRoutes.DASHBOARD} /> },
    ],
  },
]);

const AppRouting = () => {
  return <RouterProvider router={router} />;
};

export default AppRouting;
