import type { StaticImageData } from "next/image"

interface NotificationTypes {
    image?: StaticImageData | string | null
    firstName: string
    lastName: string
    type: 'Like' | 'Follower' | 'Commentary'
}

export default NotificationTypes;