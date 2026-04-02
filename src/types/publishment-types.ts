import type { StaticImageData } from "next/image"

interface PublishmentTypes {
    userImage?: StaticImageData | string | null
    firstName: string
    lastName: string
    text: string
    image?: StaticImageData | string | null
    likes: number
    comments: []
}

export default PublishmentTypes;