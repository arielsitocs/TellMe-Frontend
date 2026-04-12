"use client"

import UserData from "@/src/components/user-data"
import SideNavigation from "@/src/components/side-navigation"

import Search from "@/src/components/search"
import { useAuth } from "@/src/context/auth-context"

export default function SearchPage() {
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

    const firstname = user?.firstname ?? "Usuario"
    const lastname = user?.lastname ?? ""
    const description = user?.description ?? ""
    const color = user?.color ?? "#1F7A68"
    const posts = user?.posts ?? 0
    const followers = user?.followers ?? 0
    const following = user?.following ?? 0

    return (

        < main className="grid grid-cols-1 lg:grid-cols-[300px_1fr] 2xl:grid-cols-[300px_50%] gap-2 sm:gap-5 pt-13 px-3 py-3" >
            <div>
                <UserData firstname={firstname} lastname={lastname} description={description} posts={posts} followers={followers} following={following} color={color} />
                <SideNavigation />
            </div>
            <div>
                <Search />
            </div>
        </main >
    )
}