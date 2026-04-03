import Image from "next/image";

import PublishmentTypes from "@/src/types/publishment-types";

import LikeIcon from "@/public/like-icon.svg";

export default function SidePopularPublishment({ firstName, lastName, text, likes }: PublishmentTypes) {
    return (
        <div className="border-b-1 border-borders p-1 pb-3">
            <div>
                <h1 className="text-main-purple">{firstName} {lastName}</h1>
                <p className="text-sm text-gray-text">{text}</p>
            </div>
            <div className="flex mt-2">
                <Image src={LikeIcon} width={18} height={18} alt="Like Icon" className="mr-1" /> 
                <p className="text-terciary-text text-sm">{likes} me gusta</p>   
            </div>
        </div>
    )
}