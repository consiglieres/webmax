import {createBrowserRouter} from "react-router";
import Authorization from "./pages/authorization/authorization.tsx";
import ListStudents from "./pages/listStudents/list-students.tsx";
import ListSamples from "./pages/listSamples/list-samples.tsx";
import FormStudentGroup from "./pages/forms/form-student/form.tsx";
import FormConfiguration from "./pages/forms/form-configuration/form-configuration.tsx";
import FormAssignment from "./pages/forms/form-assignment/form-assignment.tsx";
import NotFound from "./pages/notFound/notFound.tsx";
import MainLayout from "./pages/layouts/mainLayout/mainLayout.tsx";
import AuthorizationLayout from "./pages/layouts/authorizationLayout/authorizationLayout.tsx";
import {guestOnlyLoader, requireAuthLoader} from "./shared/auth/guards.ts";

const router = createBrowserRouter([
    {
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
        Component: MainLayout,
        loader: requireAuthLoader,
        children: [
            {
                path: "listStudents",
                Component: ListStudents
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
