"use client"

import Image from "next/image";

import { useRef } from "react";

import Button from "../components/ui/button";
import { getInitials, getSoftUserColor } from "../utils/name";

import ImageIcon from "@/public/image-icon.svg";
import EmojiIcon from "@/public/emoji-icon.svg";

export default function ContentPublish() {
    const image = false;
    const firstName = "Juan"
    const lastName = "Díaz"
    const userColor = getSoftUserColor(firstName, lastName)

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-card-background mt-1 sm:mt-5 px-3 py-2 min-h-50 rounded-lg border-1 border-borders">
            <div className="flex gap-3">
                {image ? <Image src={image} width={24} height={24} alt="User Picture" /> : <div className="w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: userColor }}>
                    {getInitials(firstName, lastName)}
                </div>}
                <textarea placeholder="¿Que estás pensando, Juan?" className="text-gray-text bg-light-card-background p-2 rounded-lg border-1 border-borders w-full min-h-30 resize-none" />
            </div>
            <hr className="border-borders w-full mt-2 mb-2" />
            <div className="flex gap-3">
                <div>
                    <Button icon={ImageIcon} action={() => fileInputRef.current?.click()} />
                    <input ref={fileInputRef} id="image-upload" type="file" className="hidden" accept="image/*" />
                </div>
                <Button icon={EmojiIcon} action={() => { }} />
                <div className="ml-auto">
                    <Button text="Publicar" action={() => { }} />
                </div>
            </div>
        </div>
    )
}