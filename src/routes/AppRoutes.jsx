import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import GuardHomePage from "../pages/GuardHomePage/GuardHomePage";
import CreateProcedurePage from "../pages/CreateProcedurePage/CreateProcedurePage";
import EditProcedure from "../pages/EditProcedure/EditProcedure";
import PathologyHomePage from "../pages/PathologyHomePage/PathologyHomePage";
import EditPathology from "../pages/EditPathology/EditPathology";
import ShowProcedure from "../pages/ShowProcedure/ShowProcedure";
import ShowPathology from "../pages/ShowPathology/ShowPathology";
import FinalReport from "../pages/FinalReportPage/FinalReportpage";
import ShowFinalReport from "../pages/ShowFinalReport/ShowFinalReport";
import EditFinalReport from "../pages/EditFinalReport/EditFinalReport";
import EditProfile from "../pages/EditProfile/EditProfile";
import CreateSpecialDayForm from "../pages/CreateSpecialDayForm/CreateSpecialDayForm";

const AppRoutes = () => {
  const router = createBrowserRouter([
   
    {
      path: "/",
      element: <Layout />, 
      children: [
        {
          index: true,
          element: <GuardHomePage />,
        },
        {
          path: "guardhome",
          element: <GuardHomePage />,
        },
        {
          path: "create",
          element: <CreateSpecialDayForm />,
        },
        {
          path: "showprocedure/:id",
          element: <ShowProcedure />,
        },
        {
          path: "editprocedure/:id",
          element: <EditProcedure />,
        },
        {
          path: "pathology",
          element: <PathologyHomePage />,
        },
        {
          path: "showpathology/:id",
          element: <ShowPathology />,
        },
        {
          path: "editPathology/:id",
          element: <EditPathology />,
        },
        {
          path:"finalreport",
          element: <FinalReport />,
        },
        {
          path: "showfinalReport/:id",
          element: <ShowFinalReport />,
        },
        {
          path: "editfinalReport/:id",
          element: <EditFinalReport />,
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