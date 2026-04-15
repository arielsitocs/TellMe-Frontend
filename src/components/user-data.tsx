"use client"

import Image from "next/image"

import { UserDataTypes } from "../types/user-data-types"

import { getInitials } from "../utils/name"

export default function UserData({ imageurl, firstname, lastname, description, posts, followers, following, color }: UserDataTypes) {
    const postsCount = posts ?? 0
    const followersCount = followers ?? 0
    const followingCount = following ?? 0

    return (
        <aside className="rounded-lg border border-borders bg-card-background mt-5 overflow-hidden">
            <div className="h-16 w-full" style={{ backgroundColor: color }}></div>
            <div className="px-5 pb-8">
                <div className="-mt-8 mb-3">
                    {imageurl ? (
                        <Image
                            src={imageurl}
                            width={64}
                            height={64}
                            alt="User Picture"
                            className="rounded-full border-4 border-card-background shadow-lg object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 flex items-center justify-center text-white font-semibold rounded-full border-4 border-card-background shadow-lg" style={{ backgroundColor: color }}>
                            {getInitials(firstname, lastname)}
                        </div>
                    )}
                </div>

                <div className="mb-5">
                    <h1 className="text-white font-semibold text-lg">{firstname} {lastname}</h1>
                    <p className="text-gray-text font-medium text-sm leading-tight">{description}</p>
                </div>

                <div className="flex text-white gap-5 text-center">
                    <div className="text-center">
                        <h1 className="font-bold">{postsCount}</h1>
                        <span className="text-terciary-text">posts</span>
                    </div>
                    <div>
                        <h1 className="font-bold">{followersCount}{followersCount > 0 ? 'k' : ''}</h1>
                        <span className="text-terciary-text">seguidores</span>
                    </div>
                    <div>
                        <h1 className="font-bold">{followingCount}</h1>
                        <span className="text-terciary-text text-sm">siguiendo</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}