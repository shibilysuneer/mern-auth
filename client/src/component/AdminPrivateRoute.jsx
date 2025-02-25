import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const AdminPrivateRoute = () => {
    const {currentUser} = useSelector((state) => state.user);
    if(!currentUser){
        return <Navigate to='/admin/signin'/>
    }
    if(!currentUser.isAdmin){
        return <Navigate to='/signin'/>
    }
    return <Outlet/>
}
export default AdminPrivateRoute;