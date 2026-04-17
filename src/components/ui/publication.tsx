"use client"

import Image from "next/image"

import PublishmentTypes, { PublicationsStateProps } from "@/src/types/publishment-types"

import { getInitials } from "@/src/utils/name";

import { getUser as getPublicationUser, updateUser } from "@/src/services/user.service";

import { getLikes, like as giveLike, dislike as giveDislike } from "@/src/services/publications.service";

import { getCommentaries as fetchCommentaries, createCommentary as insertComentary } from "@/src/services/commentary.service";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/src/context/auth-context";

import { deletePublication as removePublication } from "@/src/services/publications.service";

import { updateAndSyncUser } from "@/src/utils/updateAndSyncUser";

import Button from "./button";
import Commentary from "./commentary";
import PublicationMenu from "./publication-menu";
import EditPublication from "@/src/app/feed/_components/edit-publication";

import VerticalMenuIcon from "@/public/vertical-menu-icon.svg";
import LikeIconFilled from "@/public/like-icon-filled.svg";
import LikeIcon from "@/public/like-icon.svg";
import CommentIcon from "@/public/comment-icon.svg";
import { UserDataTypes } from "@/src/types/user-data-types";

export default function Publication({ publicationid, userid, content, imageurl, likes, comments, onDelete, publications, setPublications }: PublishmentTypes & PublicationsStateProps) {
    const [user, setUser] = useState<UserDataTypes | null>(null);
    const [commentaryContent, setCommentaryContent] = useState('');
    const [commentaries, setCommentaries] = useState<any[]>([]);
    const [filteredCommentaries, setFilteredCommentaries] = useState<any[]>([]);
    const [commentarySection, setCommentarySection] = useState(false);
    const [menuState, setMenuState] = useState(false);
    const [localLikes, setLocalLikes] = useState(likes ?? 0);
    const [liked, setLiked] = useState(false);
    const [isSubmittingLike, setIsSubmittingLike] = useState(false);
    const [loaderState, setLoaderState] = useState(false);
    const [editPublication, setEditPublication] = useState(false);

    const router = useRouter();

    const auth = useAuth() as any;

    const loggedUser = auth.user;

    const token = auth.token;

    // Obtiene el usuario de la publicacion //
    const getUser = async () => {
        const user = await getPublicationUser(userid);
        setUser(user);
    }

    // Obtiene los comentarios //
    const getCommentaries = async () => {
        const commentaries = await fetchCommentaries();
        setCommentaries(commentaries)
    }

    // Filtra los comentarios de esta publicacion //
    const filterCommentaries = () => {
        const filtered = commentaries.filter((commentary) => commentary.publicationid === publicationid)
        setFilteredCommentaries(filtered);
    }

    const deletePublication = async () => {
        try {
            setLoaderState(true);
            await removePublication(publicationid, token);
            // Actualiza el usuario restando 1 a posts y pasando toda la data obligatoria en el dto //
            const updatedUserData = {
                email: loggedUser?.email ?? "",
                firstname: loggedUser?.firstname ?? "",
                lastname: loggedUser?.lastname ?? "",
                username: loggedUser?.username ?? "",
                description: loggedUser?.description ?? "",
                color: loggedUser?.color ?? "",
                posts: (loggedUser?.posts ?? 0) - 1,
                followers: loggedUser?.followers ?? 0,
                following: loggedUser?.following ?? 0
            };
            await updateAndSyncUser(loggedUser?.userid, updatedUserData, token, auth.saveSession);
            // Esto borra el componente del DOM inmediatamente //
            if (onDelete) {
                onDelete(publicationid);
            }
            setMenuState(false);
        } catch (error) {
            console.error('Error al eliminar la publicacion: ', error);
        } finally {
            setLoaderState(false);
        }
    }

    // Verifica que el like del usuario exista en al publicacion //
    const loadLikedState = async () => {
        if (!publicationid || !auth?.user?.userid) return;

        const likesData = await getLikes();
        const existsLike = (likesData ?? []).some((like: any) => like.publicationid === publicationid && like.userid === auth.user.userid);
        setLiked(existsLike);
    }

    // Da like o dislike dependiendo de el estado de liked //
    const toggleLike = async () => {
        if (!publicationid || !auth?.token || isSubmittingLike) return;

        setIsSubmittingLike(true);
        try {
            if (liked) {
                await giveDislike(publicationid, auth.token);
                setLocalLikes((prev) => Math.max(prev - 1, 0));
                setLiked(false);
            } else {
                await giveLike(publicationid, auth.token);
                setLocalLikes((prev) => prev + 1);
                setLiked(true);
            }
        } finally {
            setIsSubmittingLike(false);
        }
    }

    // Crea un comentario y refresca estos mismos //
    const createComentary = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newCommentary = {
                content: commentaryContent,
                publicationid: publicationid
            }

            await insertComentary(newCommentary, token);
            setCommentaryContent('');
            getCommentaries();
            filterCommentaries();
        } catch (error) {
            console.error('Error al crear comentario: ', error)
        }
    }

    const navigateToUser = (userid?: number) => {
        router.push(`/profile/${userid}`)
    }

    useEffect(() => {
        getUser();
        getCommentaries();
        setLocalLikes(likes ?? 0);
        loadLikedState();
    }, [userid, likes, publicationid, auth?.user?.userid])

    useEffect(() => {
        filterCommentaries();
    }, [commentaries, publicationid])

    return (
        <>
            <div className="flex flex-col relative p-3 rounded-lg border-1 border-borders bg-card-background">
                <div className="flex">
                    <div className="flex items-center w-fit mb-2 rounded-lg hover:opacity-70 cursor-pointer" onClick={() => navigateToUser(userid)}>
                        {user?.imageurl ? <Image src={user?.imageurl} width={24} height={24} alt="User Picture" /> : <div className="w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: user?.color }}>
                            {getInitials(user?.firstname ?? 'U', user?.lastname ?? '')}
                        </div>}
                        <div className="ml-3">
                            <h1 className="text-white">{user?.firstname} {user?.lastname}</h1>
                            <p className="text-gray-text text-sm">hace 5 minutos</p>
                        </div>
                    </div>
                    {
                        loggedUser?.userid !== userid ?
                            null
                            :
                            <div className="ml-auto pt-2">
                                <Image src={VerticalMenuIcon} width={24} height={24} alt="Menu Icon" className="hover:opacity-80 cursor-pointer" onClick={() => setMenuState(!menuState)} />
                            </div>
                    }

                </div>
                <div className="flex">
                    <p className="text-main-text text-[14px]">{content}</p>
                </div>
                {imageurl && (
                    <div className="w-full h-60 mt-3 rounded-lg border-1 border-borders bg-light-card-background flex items-center justify-center">
                        <Image src={imageurl} width={64} height={64} alt="Post image" />
                    </div>
                )}
                <div className="flex gap-3 mt-3">
                    <Button icon={liked ? LikeIconFilled : LikeIcon} text={`${localLikes} me gusta`} action={toggleLike} disabled={isSubmittingLike} />
                    <Button icon={CommentIcon} text={`${filteredCommentaries?.length} ${filteredCommentaries.length === 1 ? 'comentario' : 'comentarios'}`} action={() => setCommentarySection(!commentarySection)} />
                </div>
                {/* Seccion de comentarios  */}
                {
                    commentarySection ?
                        <div className="rounded-lg bg-card-background text-main-text border-borders mt-2">
                            <div className="flex justify-between border-b-1 border-borders pb-6 pt-6">
                                <h1 className="font-medium">Comentarios</h1>
                                <h1 className="hover:opacity-60 cursor-pointer mr-5" onClick={() => setCommentarySection(false)} >x</h1>
                            </div>
                            <div className="flex flex-col gap-5 pt-5 pb-5 border-b-1 border-borders ">

                                {
                                    filteredCommentaries.length === 0 ?
                                        <div>
                                            <h1 className="text-gray-text">No hay comentarios en esta publicación!</h1>
                                        </div>
                                        :
                                        filteredCommentaries
                                            .map((commentary) => (
                                                <Commentary key={commentary.commentaryid} userid={commentary.userid} content={commentary.content} />
                                            ))
                                }
                            </div>
                            <div className="flex items-center pt-4">
                                <div className="flex gap-3 text-[13px] mr-2">
                                    {loggedUser?.imageurl ? <Image src={loggedUser.imageurl} width={24} height={24} alt="User Picture" /> : <div className="w-11 h-11 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: loggedUser?.color }}>
                                        {getInitials(loggedUser?.firstname ?? "U", loggedUser?.lastname ?? "")}
                                    </div>}
                                </div>
                                <form onSubmit={createComentary} className="flex w-full font-medium">
                                    <input required type="text" placeholder="Escribe un comentario..." className="rounded-full px-6 py-4 bg-lighter-card-background w-full" value={commentaryContent} onChange={(e) => setCommentaryContent(e.target.value)} />
                                    <button type="submit" className="px-4 bg-main-purple rounded-lg ml-2 text-sm hover:opacity-60 cursor-pointer">Enviar</button>
                                </form>
                            </div>
                        </div>
                        :
                        null
                }
                {/* Seccion de menu */}
                <PublicationMenu state={menuState} setState={setMenuState} deletePublication={() => deletePublication()} editPublicationState={editPublication} setEditPublicationState={setEditPublication} />
                {/* Modal de editar publicacion */}
                <EditPublication
                    publicationid={publicationid}
                    content={content}
                    likes={likes}
                    userid={userid}
                    state={editPublication}
                    setState={setEditPublication}
                    publications={publications}
                    setPublications={setPublications}
                />
            </div>
        </>
    )
}