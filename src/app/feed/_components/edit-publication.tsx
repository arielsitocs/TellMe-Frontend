"use client"

import PublishmentTypes, { PublicationsStateProps } from "@/src/types/publishment-types"

import { useState, useEffect } from "react"

import { useRef } from "react";

import { findUser } from "@/src/utils/user";

import { getInitials } from "@/src/utils/name";

import { updatePublication } from "@/src/services/publications.service";

import { useAuth } from "@/src/context/auth-context";

import { toast } from "sonner";

import Loader from "@/src/components/ui/loader";

import { UserDataTypes } from "@/src/types/user-data-types";

import Image from "next/image";

import Button from "@/src/components/ui/button";

import ImageIcon from "@/public/image-icon.svg";
import EmojiIcon from "@/public/emoji-icon.svg";

export default function EditPublication({ publicationid, content, imageurl, likes, userid, state, setState, publications, setPublications }: PublishmentTypes & PublicationsStateProps ) {
    const [newContent, setNewContent] = useState(content || "");
    const [newImageUrl, setNewImageUrl] = useState(imageurl);
    const [publicationUser, setPublicationUser] = useState<UserDataTypes | null>(null)
    const [loaderState, setLoaderState] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const auth = useAuth() as any;

    const token = auth?.token;

    const getUser = async () => { setPublicationUser(await findUser(userid ?? null)); }

    useEffect(() => {
        setNewContent(content || "");
        setNewImageUrl(imageurl);
        getUser();
    }, [publicationid, content, imageurl, likes]);

    const patchPublication = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newContent) {
            setError('La publicación no puede estar vacia')
            return null;
        }

        console.log(publicationid)

        try {
            setLoaderState(true);

            const updatedPublication = {
                content: newContent,
                imageurl: newImageUrl,
                likes: likes
            }

            await updatePublication(publicationid, updatedPublication, token);
            // Actualiza el array local de publicaciones inmediatamente //
            setPublications?.((prev: any[]) =>
                prev.map(publication =>
                    publication.publicationid === publicationid ? { ...publication, content: newContent, imageurl: newImageUrl, likes } : publication
                )
            );
            setState?.(false)
            toast.success('Publicación actualizada!')
        } catch (error) {
            setError('Error al actualizar tu publicacion');
            console.error('Error al actualizar la publicación: ', error);
        } finally {
            setLoaderState(false);
        }
    }

    if (!state) return null

    return (
        <div className="flex flex-col fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[95%] md:w-[600px] bg-alternative-card-background rounded-lg p-5 shadow-lg">
            <div className="flex border-b-1 border-borders">
                <h1 className="text-white text-lg pb-2">Editar publicación</h1>
                <button type="button" className="text-gray-text ml-auto text-lg hover:opacity-80 cursor-pointer" onClick={() => setState?.(false)}>x</button>
            </div>
            <form onSubmit={patchPublication} className="flex flex-col">
                <div className="flex pt-3 pb-3">
                    {imageurl ? (
                        <Image
                            src={imageurl}
                            width={64}
                            height={64}
                            alt="User Picture"
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 text-sm flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: publicationUser?.color }}>
                            {getInitials(publicationUser?.firstname || "", publicationUser?.lastname || "")}
                        </div>
                    )}
                    <div className="ml-2">
                        <h1 className="text-main-text font-medium">{publicationUser?.firstname} {publicationUser?.lastname}</h1>
                        <p className="text-xs text-terciary-text font-medium">Editando publicación</p>
                    </div>
                </div>
                <div className="border-b-1 border-borders">
                    <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} className="text-gray-text bg-card-background p-2 rounded-lg border-1 border-borders w-full min-h-25 resize-none"></textarea>
                    {error ? <div className="flex items-center ml-2"><p className="text-red font-medium">{error}</p></div> : null}
                    <div className="flex gap-2 pt-3 pb-3">
                        <Button icon={ImageIcon} action={() => fileInputRef.current?.click()} />
                        <input ref={fileInputRef} id="image-upload" type="file" className="hidden" accept="image/*" />
                        <Button icon={EmojiIcon} action={() => { }} />
                    </div>
                </div>
                {
                    loaderState ?
                        <Loader state={loaderState} setLoaderState={setLoaderState} />
                        :
                        <div className="flex gap-3 ml-auto pt-5">
                            <button type="submit" className="px-4 py-1 rounded-full text-main-text border-1 border-borders hover:opacity-60 cursor-pointer" onClick={() => setState?.(false)}>Cancelar</button>
                            <button className="px-4 py-1 rounded-full text-main-text border-1 border-borders bg-main-purple hover:opacity-60 cursor-pointer">Guardar</button>
                        </div>
                }

            </form>
        </div>
    )

}