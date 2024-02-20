import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"
import "./index.css";
import Auth from "./entry/Auth";
import Main from "./main/Main";
import Account from "./account/AccountUser";
import Admin from "./admin/Admin";
import AccountAdmin from "./account/AccountAdmin";
import ChangeAccount from "./change_account/changeAccount";
import Reg from "./entry/Reg";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                path: "/auth",
                element: <Auth />
            },
            {
                path: "/reg",
                element: <Reg />,
            }]
    },
    {
        path: '*',
        element: <Navigate to="/auth" />
    }
])

const authRouter = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                path: '/',
                element: <Main />
            },
            {
                path: "/account",
                element: <Account />
            },
            {
                path: "/changeAccount",
                element: <ChangeAccount />
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }]
    }
])

const authRouterAdmin = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/account",
                element: <AccountAdmin />
            },
            {
                path: "/changeAccount",
                element: <ChangeAccount />
            },
            {
                path: '*',
                element: <Navigate to="/admin" />
            }]
    }
])

function App() {
    // dispetch(reset(12345678)) // попадут в action из регистрации
    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)

    console.log({ token, role, id })

    return (
        token ?
            role == 2 ?
                <RouterProvider router={authRouterAdmin} /> :
                <RouterProvider router={authRouter} /> :
            <RouterProvider router={router} />
    )
}

export default App


