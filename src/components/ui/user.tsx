import Image from "next/image"

import { UserDataTypes } from "@/src/types/user-data-types"

import { formatName, getInitials } from "@/src/utils/name"

export default function User({ imageurl, firstname, lastname, followers, color }: UserDataTypes) {
    const userColor = color || "#1F7A68"

    return (
        <div className="flex flex-col md:flex-row items-center gap-2 p-3 lg:px-3 lg:py-4 border-b-1 border-borders last:border-b-0">
            {imageurl ? (
                <Image
                    src={imageurl}
                    width={44}
                    height={44}
                    alt="User Picture"
                    className="w-11 h-11 rounded-full border-2 border-card-background shadow-lg object-cover"
                />
            ) : (
                <div
                    className="w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full border-2 border-card-background shadow-lg"
                    style={{ backgroundColor: userColor }}
                >
                    {getInitials(firstname, lastname)}
                </div>
            )}

            <div className="flex-1 text-center md:text-left">
                <h1 className="text-white font-semibold leading-tight truncate">
                    {firstname} {lastname}
                </h1>
                <p className="text-sm text-terciary-text truncate">
                    {formatName(firstname, lastname)} · {followers} seguidores
                </p>
            </div>

            <button
                type="button"
                className="px-5 py-1 rounded-full border-1 border-main-purple text-main-purple hover:bg-main-purple hover:text-white transition-all cursor-pointer"
            >
                Seguir
            </button>
        </div>
    )
}

