import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SpecialDayHomePage from "../pages/ServicesPage/ServicesPage";
import EditSpecialDay from "../pages/EditSpecialDay/EditSpecialDay";
import EditProfile from "../pages/EditProfile/EditProfile";
import CreateSpecialDayForm from "../pages/CreateSpecialDayForm/CreateSpecialDayForm";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import UserSpecialDay from "../pages/UserSpecialDay/UserSpecialDay";
import GuestsPage from "../pages/GuestsPage/GuestsPage";

const AppRoutes = () => {
  const router = createBrowserRouter([
   
    {
      path: "/",
      element: <Layout />, 
      children: [
        {
          index: true,
          element: <SpecialDayHomePage />,
        },
        {
          path: "guests",
          element: <GuestsPage />,
        },
        {
          path: "services",
          element: <ServicesPage />,
        },
        {
          path: "create",
          element: <CreateSpecialDayForm />,
        },
        {
          path: "userspecialday/:id",
          element: <UserSpecialDay />,
        },
        {
          path: "editspecialday/:id",
          element: <EditSpecialDay />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path:"edit-profile/:id",
          
          element:<EditProfile/>

        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
      
    },
    {
      path: "login",
      element: <LoginPage />,
    },
   

  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;