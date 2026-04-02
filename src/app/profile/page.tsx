"use client"

import UserData from "@/src/components/user-data"
import SideNavigation from "@/src/components/side-navigation"
import Profile from "@/src/components/profile"

export default function ProfilePage() { 
    return (
        <main className="grid grid-cols-1 gap-4 sm:grid-cols-[300px_1fr] lg:grid-cols-[300px_50%] pt-13 p-3">
            <div>
                <UserData firstName="Juan" lastName="Díaz" description="Desarrollador web · Aprendiendo cada día" posts={142} followers={1.2} following={380} />
                <SideNavigation />
            </div>
            <div>
                <Profile firstName="Juan" lastName="Díaz" description="Desarrollador web apasionado por crear cosas bonitas y funcionales. Aprendiendo cada día. 🚀" posts={142} followers={1.2} following={380} />
            </div>
        </main>
    )
}