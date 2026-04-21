"use client"

import Image from "next/image";

import { FormEvent, useState, useRef } from "react";

import Button from "../components/ui/button";
import Loader from "./ui/loader";

import { getInitials } from "../utils/name";

import ImageIcon from "@/public/image-icon.svg";
import EmojiIcon from "@/public/emoji-icon.svg";

import { useAuth } from "../context/auth-context";

import { updateAndSyncUser } from "../utils/updateAndSyncUser";

import { createPublication as insertPublication } from "@/src/services/publications.service";

export default function ContentPublish() {
    const [text, setText] = useState('')
    const [loaderState, setLoaderState] = useState(false)

    const { user, token, saveSession } = useAuth() as any;

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
            // Actualiza el usuario sumando 1 a posts y pasando toda la data obligatoria en el dto //
            const updatedUserData = {
                ...user,
                posts: (user?.posts ?? 0) + 1,
            };
            await updateAndSyncUser(user?.userid, updatedUserData, token, saveSession);
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
            <div className="flex items-center gap-3">
                {user?.imageurl ? <Image src={user?.imageurl} width={100} height={100} alt="User Picture" className="rounded-full object-cover w-20 h-20" /> : <div className="w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: color }}>
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