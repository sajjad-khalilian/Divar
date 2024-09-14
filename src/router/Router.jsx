import { useQuery } from "@tanstack/react-query"
import Loader from "components/module/Loader"
import HomePage from "components/templates/HomePage"
import AdminPage from "pages/AdminPage"
import AuthPage from "pages/AuthPage"
import DashboardPage from "pages/DashboardPage"
import { Navigate, Route, Routes } from "react-router-dom"
import { getProfile } from "services/user"


function Router() {

    const queryKey = ["get-profile"]
    const {data , isPending} = useQuery({queryKey , queryFn: getProfile})

    if(isPending) return <Loader/>

    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="/auth" element={data ? <Navigate to="/dashboard"/> : <AuthPage/>}/>
            <Route path="/dashboard" element={data ? <DashboardPage/> : <Navigate to="/auth"/>}/>
            <Route path="/admin" element={data && data.data.role === "ADMIN" 
            ? <AdminPage/> 
            : <Navigate to="/"/>}
            />
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default Router
