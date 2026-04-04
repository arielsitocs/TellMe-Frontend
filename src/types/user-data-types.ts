import type { StaticImageData } from "next/image"

interface UserDataTypes {
    image?: StaticImageData | string | null
    firstName: string
    lastName: string
    description: string
    posts: number
    followers: number
    following: number
    color: string
    state?: boolean
    setState?: (state: boolean) => void
}

export default UserDataTypes;