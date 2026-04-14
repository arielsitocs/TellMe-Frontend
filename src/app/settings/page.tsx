"use client"

import UserData from "@/src/components/user-data"
import SideNavigation from "@/src/components/side-navigation"

import { useAuth } from "@/src/context/auth-context"

import Settings from "@/src/components/settings"

export default function SettingsPage() {
    const { user } = useAuth() as unknown as {
        user: {
            firstname?: string
            lastname?: string
            description?: string
            color?: string
            posts?: number
            followers?: number
            following?: number
        } | null
    }

    const firstname = user?.firstname ?? "error"
    const lastname = user?.lastname ?? "error"
    const description = user?.description ?? "error"
    const color = user?.color ?? "#FFFFFF"
    const posts = user?.posts ?? 0
    const followers = user?.followers ?? 0
    const following = user?.following ?? 0

    return (
        <main className="grid grid-cols-1 gap-4 sm:grid-cols-[300px_1fr] lg:grid-cols-[300px_50%] pt-13 p-3">
            <div>
                <UserData firstname={firstname} lastname={lastname} description={description} posts={posts} followers={followers} following={following} color={color} />
                <SideNavigation />
            </div>
            <div>
                <Settings />
            </div>
        </main>
    )
}