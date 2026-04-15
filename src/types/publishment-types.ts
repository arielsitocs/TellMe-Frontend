
import type { StaticImageData } from "next/image"
import type { Dispatch, SetStateAction } from "react";

interface PublishmentTypes {
    publicationid?: number
    userid?: number
    firstname?: string
    lastname?: string
    content: string
    imageurl?: StaticImageData | string | null
    likes: number
    usercolor?: string
    onDelete?: any
    comments?: []
    state?: boolean
    setState?: (state: boolean) => void
}

export interface PublicationsStateProps {
    publications?: PublishmentTypes[];
    setPublications?: Dispatch<SetStateAction<PublishmentTypes[]>>;
}

export default PublishmentTypes;