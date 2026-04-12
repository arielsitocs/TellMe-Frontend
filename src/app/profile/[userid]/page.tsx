"use client"

import UserData from "@/src/components/user-data"
import SideNavigation from "@/src/components/side-navigation"
import Profile from "@/src/components/profile"

import { useAuth } from "@/src/context/auth-context"

export default function ProfilePage() {
    const { user } = useAuth() as unknown as {
        user: {
            userid?: number
            firstname?: string
            lastname?: string
            username?: string
            description?: string
            color?: string
            posts?: number
            followers?: number
            following?: number
        } | null
    }

    const userid = user?.userid ?? 616
    const firstname = user?.firstname ?? "error"
    const lastname = user?.lastname ?? "error"
    const username = user?.username ?? "error"
    const description = user?.description ?? "error"
    const color = user?.color ?? "#FFFFFF"
    const posts = user?.posts ?? 0
    const followers = user?.followers ?? 0
    const following = user?.following ?? 0

    return (
        <main className="grid grid-cols-1 gap-4 sm:grid-cols-[300px_1fr] lg:grid-cols-[300px_50%] pt-13 p-3">
            <div>
                <UserData userid={userid} firstname={firstname} lastname={lastname} username={username} description={description} posts={posts} followers={followers} following={following} color={color} />
                <SideNavigation />
            </div>
            <div onClick={() => { }}>
                <Profile userid={userid} firstname={firstname} lastname={lastname} username={username} description={description} posts={posts} followers={followers} following={following} color={color} />
            </div>
        </main>
    )
}