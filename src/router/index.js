import React from "react";
import { RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import UserLayout from "../layouts/user-layout";
import HomePage from "../pages/home-page";
import CoursesPage from "../pages/courses-page";
import EventsPage from "../pages/events-page";
import AboutPage from "../pages/about-page";
import ContactPage from "../pages/contact-page";
import LoginPage from "../pages/login-page";
import AdminManagementPage from "../pages/dashboard/admin-management-page";
import ManagerManagementPage from "../pages/dashboard/manager-management-page";
import PrivateRoute from "./private-route";
import { config } from "../helpers/config";
import UnauthorizedPage from "../pages/errors/error-401";
import DashboardPage from "../pages/dashboard/dashboard-page";
import Error404Page from "../pages/errors/error-404";
import Error401Page from "../pages/errors/error-401";
import AssistantManagerManagementPage from "../pages/dashboard/assistant-manager-management-page";
import TeacherManagementPage from "../pages/dashboard/teacher-management-page";
import LessonManagementPage from "../pages/dashboard/lesson-management-page";
import StudentManagementPage from "../pages/dashboard/student-management-page";
import StudentInfoManagementPage from "../pages/dashboard/student-info-management-page";
import MeetManagementPage from "../pages/dashboard/meet-management-page";
import ChooseLessonPage from "../pages/dashboard/choose-lesson-page";
import GradeMeetPage from "../pages/dashboard/grade-meet-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        
      },
      {
        path: "courses",
        element: <CoursesPage/>
      },
      {
        path: "events",
        element: <EventsPage/>
      },
      {
        path: "about",
        element: <AboutPage/>
      },
      {
        path: "contact",
        element: <ContactPage/>
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      
      {
        path: "dashboard",
        children: [
          {
            index: true,  
            element: <PrivateRoute roles={config.pageRoles.dashboard}><DashboardPage/></PrivateRoute>
          },
          {
            path: "admin-management",  
            element: <PrivateRoute roles={config.pageRoles.adminManagement}><AdminManagementPage/></PrivateRoute>
          },
          {
            path: "manager-management",  
            element: <PrivateRoute roles={config.pageRoles.managerManagement}><ManagerManagementPage/></PrivateRoute>
          },
          {
            path: "assistant-manager-management",  
            element: <PrivateRoute roles={config.pageRoles.assistantManagerManagement}><AssistantManagerManagementPage/></PrivateRoute>
          },
          {
            path: "teacher-management",  
            element: <PrivateRoute roles={config.pageRoles.teacherManagement}><TeacherManagementPage/></PrivateRoute>
          },
          {
            path: "lesson-management",  
            element: <PrivateRoute roles={config.pageRoles.lessonManagement }><LessonManagementPage/></PrivateRoute>
          },
          {
            path: "student-management",  
            element: <PrivateRoute roles={config.pageRoles.studentManagement }><StudentManagementPage/></PrivateRoute>
          },
          {
            path: "student-info-management",  
            element: <PrivateRoute roles={config.pageRoles.studentInfoManagement }><StudentInfoManagementPage/></PrivateRoute>
          },
          {
            path: "meet-management",  
            element: <PrivateRoute roles={config.pageRoles.meetManagement }><MeetManagementPage/></PrivateRoute>
          },
          {
            path: "choose-lesson",  
            element: <PrivateRoute roles={config.pageRoles.chooseLesson }><ChooseLessonPage/></PrivateRoute>
          },
          {
            path: "grades-meets",  
            element: <PrivateRoute roles={config.pageRoles.gradesAndMeets }><GradeMeetPage/></PrivateRoute>
          }
        ]
      },
      {
        path: "unauthorized",
        element: <Error401Page/>
      },
      {
        path: '*',
        element: <Error404Page />
      }
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
