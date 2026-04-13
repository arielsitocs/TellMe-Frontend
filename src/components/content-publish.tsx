"use client"

import Image from "next/image";

import { FormEvent, useState, useRef } from "react";

import Button from "../components/ui/button";
import { getInitials } from "../utils/name";
import Loader from "./ui/loader";

import ImageIcon from "@/public/image-icon.svg";
import EmojiIcon from "@/public/emoji-icon.svg";

import { useAuth } from "../context/auth-context";

import { createPublication as insertPublication } from "@/src/services/publications.service";

export default function ContentPublish() {
    const [text, setText] = useState('')
    const [loaderState, setLoaderState] = useState(false)

    const { user, token } = useAuth() as unknown as {
        user: {
            userid?: number
            firstname?: string
            lastname?: string
            description?: string
            color?: string
        } | null
        token?: string | null
    }

    const image = false;
    const firstname = user?.firstname ?? 'error'
    const lastname = user?.lastname ?? 'error'
    const color = user?.color ?? '#FFFFFF'

    const fileInputRef = useRef<HTMLInputElement>(null);

    const createPublication = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoaderState(true);
        try {
            const publication = {
                content: text,
                userid: user?.userid
            }
            await insertPublication(publication, token)
            window.location.reload()
        } catch (error) {
            console.error(error)
        } finally {
            setLoaderState(false);
        }
    }

    return (
        <form onSubmit={createPublication} className="bg-card-background mt-1 sm:mt-5 px-3 py-2 min-h-50 rounded-lg border-1 border-borders">
            <div className="flex gap-3">
                {image ? <Image src={image} width={24} height={24} alt="User Picture" /> : <div className="w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: color }}>
                    {getInitials(firstname, lastname)}
                </div>}
                <textarea required placeholder="¿Que estás pensando?" className="text-gray-text bg-light-card-background p-2 rounded-lg border-1 border-borders w-full min-h-30 resize-none" onChange={(e) => setText(e.target.value)} />
            </div>
            <hr className="border-borders w-full mt-2 mb-2" />
            <div className="flex gap-3">
                <div>
                    <Button icon={ImageIcon} action={() => fileInputRef.current?.click()} />
                    <input ref={fileInputRef} id="image-upload" type="file" className="hidden" accept="image/*" />
                </div>
                <Button icon={EmojiIcon} action={() => { }} />
                <div className="ml-auto">
                    {loaderState ? <Loader state={loaderState} setState={setLoaderState} /> : <Button type="submit" text="Publicar" action={() => { }} />}
                </div>
            </div>
        </form>
    )
}