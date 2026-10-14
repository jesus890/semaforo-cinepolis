import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/navigation/Sidebar";

export default function DashboardLayout() {

    return (

        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <main className="flex-1 overflow-auto">

                <Outlet />

            </main>

        </div>
    );
}