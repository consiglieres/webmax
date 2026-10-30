import {createBrowserRouter} from "react-router";
import Authorization from "./pages/authorization/authorization.tsx";
import ListStudents from "./pages/listStudents/list-students.tsx";
import ListSamples from "./pages/listSamples/list-samples.tsx";
import ViewStudent from "./pages/viewStudent/view-student.tsx";
import ViewConfiguration from "./pages/viewConfiguration/view-configuration.tsx";
import FormStudentGroup from "./pages/forms/form-student/form.tsx";
import FormConfiguration from "./pages/forms/form-configuration/form-configuration.tsx";
import FormAssignment from "./pages/forms/form-assignment/form-assignment.tsx";
import NotFound from "./pages/notFound/notFound.tsx";
import MainLayout from "./pages/layouts/mainLayout/mainLayout.tsx";
import Home from "./pages/home/home.tsx";
import AuthorizationLayout from "./pages/layouts/authorizationLayout/authorizationLayout.tsx";
import {guestOnlyLoader, requireAuthLoader} from "./shared/auth/guards.ts";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: AuthorizationLayout,
        loader: guestOnlyLoader,
        children: [
            {
                index: true,
                Component: Authorization,
            }
        ]
    },
    {
        path: "/",
        Component: MainLayout,
        loader: requireAuthLoader,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "listStudents",
                Component: ListStudents
            },
            {
                path: "listStudents/:id",
                Component: ViewStudent
            },
            {
                path: "listStudents/form",
                Component: FormStudentGroup
            },
            {
                path: "listSamples",
                Component: ListSamples
            },
            {
                path: "listSamples/:id",
                Component: ViewConfiguration
            },
            {
                path: "listSamples/form",
                Component: FormConfiguration
            },
            {
                path: "listSamples/assign",
                Component: FormAssignment
            }
        ]
    },
    {
        path: "*",
        Component: NotFound
    }
]);

export default router;
