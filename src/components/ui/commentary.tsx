"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

import { getUser as getCommentaryUser } from "@/src/services/user.service"

import { getInitials } from "@/src/utils/name"

import CommentaryTypes from "@/src/types/commentary-types"

type CommentaryUser = {
    imageurl?: string | null
    firstname?: string
    lastname?: string
    color?: string
}

export default function Commentary({ userid, content }: CommentaryTypes) {
    const [user, setUser] = useState<CommentaryUser | null>(null);

    const getUser = async () => {
        const user = await getCommentaryUser(userid);
        setUser(user);
    }

    useEffect(() => {
        getUser();
    }, [userid])

    return (
        <div className="flex items-center">
            <div className="flex gap-3 mb-auto mt-[8px] text-[15px]">
                {user?.imageurl ? <Image src={user.imageurl} width={24} height={24} alt="User Picture" /> : <div className="w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: user?.color }}>
                    {getInitials(user?.firstname ?? "U", user?.lastname ?? "")}
                </div>}
            </div>
            <div className="ml-2 text-[15px]">
                <div className="px-3 py-2 rounded-lg bg-lighter-card-background">
                    <h1 className="font-bold ">{user?.firstname} {user?.lastname}</h1>
                    <p>{content}</p>
                </div>
                <p className="text-sm text-terciary-text mt-1">hace 5 minutos</p>
            </div>
        </div>
    )
}