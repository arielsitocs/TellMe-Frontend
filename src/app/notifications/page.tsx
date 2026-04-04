import Notifications from "@/src/components/notifications"

import UserData from "@/src/components/user-data"
import SideNavigation from "@/src/components/side-navigation"
import { getSoftUserColor } from "@/src/utils/name"

export default function Page() {
    const userColor = getSoftUserColor("Juan", "Díaz")

    return (
        <main className="grid grid-cols-1 lg:grid-cols-[300px_70%] gap-2 sm:gap-5 pt-13 px-3 py-3">
            <div>
                <UserData firstName="Juan" lastName="Díaz" description="Desarrollador web · Aprendiendo cada día" posts={142} followers={1.2} following={380} color={userColor} />
                <SideNavigation />
            </div>
            <div>
                <Notifications />
            </div>
        </main>
    )
}