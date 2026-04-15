
import type { StaticImageData } from "next/image"
import type { Dispatch, SetStateAction } from "react";

export interface UserDataTypes {
    userid?: number
    imageurl?: StaticImageData | string | null
    firstname: string
    lastname: string
    username?: string
    description: string
    posts?: number
    followers?: number
    following?: number
    color: string
    state?: boolean
    setState?: (state: boolean) => void
}