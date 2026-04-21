"use client"

import Notifications from "@/src/components/notifications"

import UserData from "@/src/components/user-data"
import SideNavigation from "@/src/components/side-navigation"
import { useAuth } from "@/src/context/auth-context"

export default function Page() {
    const { user } = useAuth() as any;

    const userid = user?.userid ?? 616
    const firstname = user?.firstname ?? 'error'
    const lastname = user?.lastname ?? 'error'
    const username = user?.username ?? 'error'
    const description = user?.description ?? 'error'
    const color = user?.color ?? '#FFFFFF'
    const posts = user?.posts ?? 0
    const imageurl = user?.imageurl
    const followers = user?.followers ?? 0
    const following = user?.following ?? 0

    return (
        <main className="grid grid-cols-1 lg:grid-cols-[300px_70%] gap-2 sm:gap-5 pt-13 px-3 py-3">
            <div>
                <UserData userid={userid} firstname={firstname} lastname={lastname} username={username} description={description} posts={posts} imageurl={imageurl} followers={followers} following={following} color={color} />
                <SideNavigation />
            </div>
            <div>
                <Notifications />
            </div>
        </main>
    )
}