import type { StaticImageData } from "next/image"

interface NotificationTypes {
    imageurl?: StaticImageData | string | null
    firstname: string
    lastname: string
    type: 'like' | 'follower' | 'commentary'
}

export default NotificationTypes;