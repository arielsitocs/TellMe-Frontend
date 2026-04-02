"use client"

import Image from "next/image"

import PublishmentTypes from "@/src/types/publishment-types"

import { getInitials } from "@/src/utils/name";

import Button from "./button";

import VerticalMenuIcon from "@/public/vertical-menu-icon.svg";

import LikeIcon from "@/public/like-icon.svg";
import CommentIcon from "@/public/comment-icon.svg";

export default function Publishment({ userImage, firstName, lastName, text, image, likes, comments }: PublishmentTypes) {
    return (
        <div className="flex flex-col p-3 rounded-lg border-1 border-borders bg-card-background">
            <div className="flex w-full mb-2">
                {userImage ? <Image src={userImage} width={24} height={24} alt="User Picture" /> : <div className="w-12 h-12 flex items-center justify-center text-white font-semibold bg-dark-purple rounded-full">
                    {getInitials(firstName, lastName)}
                </div>}
                <div className="ml-3">
                    <h1 className="text-white">{firstName} {lastName}</h1>
                    <p className="text-gray-text text-sm">hace 5 minutos</p>
                </div>
                <div className="ml-auto">
                    <Image src={VerticalMenuIcon} width={24} height={24} alt="Menu Icon" className="hover:opacity-80 cursor-pointer" />
                </div>
            </div>
            <div className="flex">
                <p className="text-main-text text-[14px]">{text}</p>
            </div>
            {image && (
                <div className="w-full h-60 mt-3 rounded-lg border-1 border-borders bg-light-card-background flex items-center justify-center">
                    <Image src={image} width={64} height={64} alt="Post image" />
                </div>
            )}
            <div className="flex gap-3 mt-3">
                <Button icon={LikeIcon} text={`${likes} me gusta`} action={() => {}} />
                <Button icon={CommentIcon} text={`${comments.length} comentarios`} action={() => {}} />
            </div>
        </div>
    )
}