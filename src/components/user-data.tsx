"use client"

import Image from "next/image"

import UserDataTypes from "../types/user-data-types"

import { getInitials } from "../utils/name"

export default function UserData({ image, firstName, lastName, description, posts, followers, following }: UserDataTypes) {
    return (
        <aside className="rounded-lg border border-borders bg-card-background mt-5 overflow-hidden">
            <div className="h-16 w-full bg-main-purple"></div>
            <div className="px-5 pb-8">
                <div className="-mt-8 mb-3">
                    {image ? (
                        <Image
                            src={image}
                            width={64}
                            height={64}
                            alt="User Picture"
                            className="rounded-full border-4 border-card-background shadow-lg object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 flex items-center justify-center text-white font-semibold bg-main-purple rounded-full border-4 border-card-background shadow-lg">
                            {getInitials(firstName, lastName)}
                        </div>
                    )}
                </div>

                <div className="mb-5">
                    <h1 className="text-white font-semibold text-lg">{firstName} {lastName}</h1>
                    <p className="text-gray-text font-medium text-sm leading-tight">{description}</p>
                </div>

                <div className="flex text-white gap-5 ">
                    <div className="text-center">
                        <h1 className="font-bold">{posts}</h1>
                        <span className="text-terciary-text">posts</span>
                    </div>
                    <div>
                        <h1 className="font-bold">{followers}k</h1>
                        <span className="text-terciary-text">seguidores</span>
                    </div>
                    <div>
                        <h1 className="font-bold">{following}</h1>
                        <span className="text-terciary-text text-sm">siguiendo</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}