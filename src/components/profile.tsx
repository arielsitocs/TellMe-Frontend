"use client"


import Image from "next/image";

import { useState, useEffect } from "react";

import { getInitials, formatName } from "../utils/name";

import { useParams } from "next/navigation";

import { getFollows } from "@/src/services/user.service";

import { getUser, updateUser } from "@/src/services/user.service"

import { updateAndSyncUser } from "../utils/updateAndSyncUser";

import { follow, unfollow } from "@/src/services/user.service";

import { getPublications as fetchPublications } from "@/src/services/publications.service"

import { useAuth } from "../context/auth-context";

import { toast } from "sonner";

import Publishment from "./ui/publication";
import Button from "./ui/button";
import Loader from "../components/ui/loader";

import EditProfile from "./edit-profile";

import CalendarIcon from "@/public/calendar-icon.svg";

export default function Profile() {
    const [editProfileState, setEditProfileState] = useState(false);
    const [publications, setPublications] = useState<any[]>([]);
    const [paramsUser, setParamsUser] = useState<any>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loaderState, setLoaderState] = useState(false);

    const { user, token, saveSession } = useAuth() as any

    const params = useParams();

    const ParamsUserId = params.userid as string;

    const loadPublications = async () => {
        setLoaderState(true);
        try {
            const data = await fetchPublications();
            setPublications(data)
        } catch (error: any) {
            throw new Error(error)
        } finally {
            setLoaderState(false);
        }
    }

    // Obtiene el usuario por parametro si es que lo hay //
    const findUser = async () => {
        try {
            if (ParamsUserId) {
                const foundUser = await getUser(ParamsUserId);
                if (!foundUser) {
                    throw new Error('Usuario no encontrado.')
                }
                setParamsUser(foundUser);
                return;
            }
            console.error('ID de usuario no proporcionado.')
        } catch (error: any) {
            throw new Error('Error al encontrar el usuario: ', error)
        }
    }

    // Si el perfil es el del usuario autenticado, usa SIEMPRE el contexto //
    const isOwnProfile = !ParamsUserId || Number(ParamsUserId) === user?.userid;
    const profileUserid = isOwnProfile ? user?.userid : paramsUser?.userid;
    const profileImageurl = isOwnProfile ? user?.imageurl : paramsUser?.imageurl;
    const profileFirstname = isOwnProfile ? user?.firstname : paramsUser?.firstname;
    const profileLastname = isOwnProfile ? user?.lastname : paramsUser?.lastname;
    const profileUsername = isOwnProfile ? user?.username : paramsUser?.username;
    const profileDescription = isOwnProfile ? user?.description : paramsUser?.description;
    const profilePosts = isOwnProfile ? user?.posts : paramsUser?.posts;
    const profileFollowers = isOwnProfile ? user?.followers : paramsUser?.followers;
    const profileFollowing = isOwnProfile ? user?.following : paramsUser?.following;
    const profileColor = isOwnProfile ? user?.color : paramsUser?.color;

    // Filtra las publicaciones del usuario //
    const filteredPubs = publications.filter((publication) => {
        return publication.userid === profileUserid
    })

    // Verifica si el usuario logueado sigue o no al usuario objetivo //
    const getFollowingState = async () => {
        const followData = await getFollows();
        const existsFollow = (followData ?? []).some((follow: any) => follow.followedid === paramsUser?.userid && follow.followerid === user?.userid);
        setIsFollowing(existsFollow);
    }

    const handleFollow = async () => {
        try {
            setLoaderState(true);
            const followData = {
                followedid: paramsUser?.userid
            }
            if (isFollowing) {
                // Actualiza el usuario restando 1 a followers y pasando toda la data obligatoria en el dto //
                const updatedFollowerUserData = {
                    ...user,
                    following: (user?.following ?? 0) - 1
                };
                await unfollow(paramsUser?.userid, token);
                await updateUser(user?.userid, updatedFollowerUserData, token);
                await updateAndSyncUser(user?.userid, updatedFollowerUserData, token, saveSession);
                toast.info(`Dejaste de seguir a ${paramsUser?.firstname} ${paramsUser?.lastname}`)
            }
            else {
                // Actualiza el usuario sumando 1 a followers y pasando toda la data obligatoria en el dto //
                const updatedFollowerUserData = {
                    ...user,
                    following: (user?.following ?? 0) + 1
                };
                await follow(followData, token);
                await updateUser(user?.userid, updatedFollowerUserData, token);
                await updateAndSyncUser(user?.userid, updatedFollowerUserData, token, saveSession);
                toast.success(`Ahora sigues a ${paramsUser?.firstname} ${paramsUser?.lastname}`)
            }
            setIsFollowing(!isFollowing);

        } catch (error: any) {
            console.error(error)
        } finally {
            setLoaderState(false);
        }
    }

    // Solo carga una vez al montar el componente //
    useEffect(() => {
        findUser();
        loadPublications();

    }, [paramsUser?.userid])

    useEffect(() => {
        if (paramsUser && user) {
            getFollowingState();
        }
    }, [paramsUser?.userid, user?.userid])

    return (
        <>
            <div className="rounded-lg w-full border border-borders bg-card-background mt-0 sm:mt-5 px-5 py-3 overflow-hidden">
                <div>
                    <div className="flex items-center mb-3">
                        {profileImageurl ? (
                            <Image
                                src={profileImageurl}
                                width={100}
                                height={100}
                                alt="User Picture"
                                className="w-25 h-25 rounded-full border-4 border-card-background  object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 flex items-center justify-center text-white font-semibold rounded-full border-4 border-card-background shadow-lg" style={{ backgroundColor: profileColor }}>
                                {getInitials(profileFirstname, profileLastname)}
                            </div>
                        )}
                        {
                            Number(ParamsUserId) !== user?.userid ?
                                <div className="ml-auto">
                                    <Button text={isFollowing ? 'Dejar de seguir' : 'Seguir'} action={handleFollow} />
                                </div>
                                :
                                <div className="ml-auto">
                                    <Button text="Editar Perfil" action={() => setEditProfileState(true)} />
                                </div>

                        }
                    </div>

                    <div className="mb-5">
                        <h1 className="text-white font-semibold text-lg">{profileFirstname} {profileLastname}</h1>
                        <h3 className="text-sm text-terciary-text mb-3">{formatName(profileFirstname, profileLastname)}</h3>
                        <p className="text-gray-text font-medium text-sm leading-tight">{profileDescription}</p>
                    </div>

                    <div className="flex mb-4">
                        <Image src={CalendarIcon} width={20} height={20} alt="Calendar Icon" />
                        <p className="text-sm text-terciary-text ml-1">se unió en enero de 2025</p>
                    </div>

                    <div className="flex text-white gap-5 border-t-1 border-borders pt-4 text-center">
                        <div className="text-center">
                            <h1 className="font-bold">{profilePosts}</h1>
                            <span className="text-terciary-text">posts</span>
                        </div>
                        <div>
                            <h1 className="font-bold">{profileFollowers}</h1>
                            <span className="text-terciary-text">seguidores</span>
                        </div>
                        <div>
                            <h1 className="font-bold">{profileFollowing}</h1>
                            <span className="text-terciary-text text-sm">siguiendo</span>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className="flex justify-center lg:justify-normal mb-3">
                <div className="flex w-full lg:w-fit bg-card-background border-1 mt-3 border-borders rounded-lg">
                    <div className="px-2 sm:px-5 py-3 flex-1 text-[14px] sm:text-md text-center text-gray-text hover:bg-main-purple hover:text-white cursor-pointer rounded-lg transition-all">
                        Publicaciones
                    </div>
                    <div className="px-2 sm:px-5 py-3 flex-1 text-[14px] sm:text-md text-center text-gray-text hover:bg-main-purple hover:text-white cursor-pointer rounded-lg transition-all">
                        Me gusta
                    </div>
                    <div className="px-2 sm:px-5 py-3 flex-1 text-[14px] sm:text-md text-center text-gray-text hover:bg-main-purple hover:text-white cursor-pointer rounded-lg transition-all">
                        Multimedia
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {
                    filteredPubs.length === 0 ?
                        <div className="w-full py-15 rounded-lg bg-card-background border-1 border-borders text-secondary-text text-center">
                            <h1>Aun no tienes publicaciones!</h1>
                        </div>
                        :
                        filteredPubs.map((publication, index) => (
                            <Publishment
                                key={index}
                                publicationid={publication.publicationid}
                                userid={publication.userid}
                                content={publication.content}
                                imageurl={publication.imageurl}
                                likes={publication.likes}
                                comments={publication.comments}
                                publications={publications}
                                setPublications={setPublications}
                            />
                        ))
                }
            </div>
            <EditProfile
                userid={profileUserid}
                imageurl={profileImageurl}
                firstname={profileFirstname}
                lastname={profileLastname}
                username={profileUsername}
                description={profileDescription}
                posts={profilePosts}
                followers={profileFollowers}
                following={profileFollowing}
                color={profileColor}
                state={editProfileState}
                setState={setEditProfileState}
            />
        </>
    )
}