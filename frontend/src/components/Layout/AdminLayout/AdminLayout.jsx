import { Outlet } from "react-router-dom"
import { AdminNavbar } from "./components/AdminNavbar/AdminNavbar";
import { AdminHeader } from "./components/AdminHeader/AdminHeader";
import "./AdminLayout.css";

export const AdminLayout = () => {

    return <div id="temporary-inner-body">
        <div id="bottom-sheet"/>
        <div className="admin-layout-main">
            <AdminHeader/>
            <main>
                <Outlet/>
            </main>
        </div>
        <AdminNavbar/>
    </div>
}