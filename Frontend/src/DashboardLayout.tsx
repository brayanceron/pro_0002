import Navigation from "./components/navigation/Navigation"
import { Outlet } from "react-router";
import { SideBar } from "./components/navigation/siderbar/SideBar";
import PlayListProvider from "./context/PlayListProvider";


const DashboardLayout = () => {
    return (
        <PlayListProvider>
            <div className="flex">
                <SideBar />

                <div className="w-full h-screen m-auto overflow-y-scroll">
                    <Navigation />
                    <div className="h-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </PlayListProvider>
    )
}

export default DashboardLayout
