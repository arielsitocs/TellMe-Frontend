import Image from "next/image";

import { getInitials, getSoftUserColor } from "@/src/utils/name";

import NotificationTypes from "@/src/types/notification-types";

import LikeIcon from "@/public/like-icon.svg";
import UserIcon from "@/public/gray-user-icon.png";
import CommentIcon from "@/public/comment-icon.svg";

export default function Notification({ image, firstName, lastName, type }: NotificationTypes) {
    const userColor = getSoftUserColor(firstName, lastName)

    const typeText = () => {
        if (type === 'Like') {
            return 'le diò me gusta a tu publicaciòn'
        } else if (type === 'Follower') {
            return 'comenzó a seguirte'
        }
        else if (type === 'Commentary') {
            return 'comentó tu publicación: "¡Felicitaciones, sigue así!"'
        }
    }

    return (
        <div className="w-full px-2 py-2  md:px-6 md:py-3 border-b-1 border-borders">
            <div className="flex justify-center items-center">
                {image ? (
                    <Image
                        src={image}
                        width={64}
                        height={64}
                        alt="User Picture"
                        className="rounded-full border-4 border-card-background shadow-lg object-cover"
                    />
                ) : (
                    <div className="w-10 h-10  md:w-12 md:h-12 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: userColor }}>
                        {getInitials(firstName, lastName)}
                    </div>
                )}
                <div className="ml-3">
                    <div className="flex">
                        <h1 className="text-white" style={{ color: userColor }}>{firstName} {lastName} </h1>
                        <h1 className="ml-1 text-gray-text">{typeText()}</h1>
                    </div>
                    <p className="text-sm text-terciary-text mt-1">hace 2 minutos</p>
                </div>
                <div className="ml-auto">
                    {
                        type === 'Like' ?
                            <Image src={LikeIcon} width={24} height={24} alt="Like Icon" />
                            :
                            type === 'Follower' ?
                                < Image src={UserIcon} width={24} height={24} alt="Like Icon" />
                                :
                                type === 'Commentary' ?
                                    <Image src={CommentIcon} width={24} height={24} alt="Like Icon" />
                                    :
                                    null
                    }
                </div>
            </div>
        </div>
    )
}