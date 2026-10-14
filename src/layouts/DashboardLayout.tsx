import { Outlet } from "react-router-dom";

import Header from "../components/Dashboard/navigation/Header";

export default function DashboardLayout() {

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="p-6">
                <Outlet />
            </main>
        </div>

    );
}