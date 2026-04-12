import type { StaticImageData } from "next/image"

interface PublishmentTypes {
    publicationid?: number
    userid?: number
    firstname?: string
    lastname?: string
    content: string
    imageurl?: StaticImageData | string | null
    likes: number
    usercolor?: string
    comments?: []
}

export default PublishmentTypes;