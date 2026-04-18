import Image from "next/image"
import { UserDataTypes } from "@/src/types/user-data-types"
import { formatName, getInitials } from "@/src/utils/name"
import { useRouter } from "next/navigation";
import { follow, unfollow } from "@/src/services/user.service";
import { updateUser } from "@/src/services/user.service";
import { useAuth } from "@/src/context/auth-context";
import { getFollows } from "@/src/services/user.service";
import { toast } from "sonner";
import { updateAndSyncUser } from "@/src/utils/updateAndSyncUser";
import Loader from "./loader";
import { useState, useEffect } from "react";

export default function User({ imageurl, userid, firstname, lastname, followers, color }: UserDataTypes) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const userColor = color || "#1F7A68"

    const router = useRouter();
    const { user, token, saveSession } = useAuth() as any;

    const navigateToUser = (userid?: number) => {
        router.push(`/profile/${userid}`)
    }

    const getFollowingState = async () => {
        const followData = await getFollows();
        const existsFollow = (followData ?? []).some((follow: any) => follow.followedid === userid && follow.followerid === user.userid);
        setIsFollowing(existsFollow);
    }

    const handleFollow = async () => {
        try {
            setLoading(true);
            const followData = {
                followedid: userid
            }
            if (isFollowing) {
                // Actualiza el usuario restando 1 a followers y pasando toda la data obligatoria en el dto //
                const updatedFollowerUserData = {
                    email: user?.email ?? "",
                    firstname: user?.firstname ?? "",
                    lastname: user?.lastname ?? "",
                    username: user?.username ?? "",
                    description: user?.description ?? "",
                    color: user?.color ?? "",
                    posts: user?.posts ?? 0,
                    followers: user?.followers ?? 0,
                    following: (user?.following ?? 0) - 1
                };
                await unfollow(userid, token);
                await updateUser(user?.userid, updatedFollowerUserData, token);
                await updateAndSyncUser(user?.userid, updatedFollowerUserData, token, saveSession);
                toast.info(`Dejaste de seguir a ${firstname} ${lastname}`)
            }
            else {
                // Actualiza el usuario sumando 1 a followers y pasando toda la data obligatoria en el dto //
                const updatedFollowerUserData = {
                    email: user?.email ?? "",
                    firstname: user?.firstname ?? "",
                    lastname: user?.lastname ?? "",
                    username: user?.username ?? "",
                    description: user?.description ?? "",
                    color: user?.color ?? "",
                    posts: user?.posts ?? 0,
                    followers: user?.followers ?? 0,
                    following: (user?.following ?? 0) + 1
                };
                await follow(followData, token);
                await updateUser(user?.userid, updatedFollowerUserData, token);
                await updateAndSyncUser(user?.userid, updatedFollowerUserData, token, saveSession);
                toast.success(`Ahora sigues a ${firstname} ${lastname}`)
            }
            setIsFollowing(!isFollowing);

        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFollowingState();
    }, [])

    return (
        <div className="flex flex-col md:flex-row items-center gap-2 p-3 lg:px-3 lg:py-4 border-b-1 border-borders last:border-b-0">
            <div className="flex items-center hover:opacity-60 cursor-pointer" onClick={() => navigateToUser(userid)}>
                {imageurl ? (
                    <Image
                        src={imageurl}
                        width={44}
                        height={44}
                        alt="User Picture"
                        className="w-11 h-11 rounded-full border-2 border-card-background shadow-lg object-cover"
                    />
                ) : (
                    <div
                        className="w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full border-2 border-card-background shadow-lg"
                        style={{ backgroundColor: userColor }}
                    >
                        {getInitials(firstname, lastname)}
                    </div>
                )}

                <div className="flex-1 text-center md:text-left ml-1">
                    <h1 className="text-white font-semibold leading-tight truncate">
                        {firstname} {lastname}
                    </h1>
                    <p className="text-sm text-terciary-text">
                        {formatName(firstname, lastname)} · {followers} seguidores
                    </p>
                </div>
            </div>
            {
                loading ?
                    <div className="mr-5 ml-auto ">
                        <Loader state={loading} setState={setLoading} />
                    </div>
                    :
                    <button
                        type="button"
                        className="px-5 py-1 ml-auto rounded-full border-1 border-main-purple text-main-purple hover:bg-main-purple hover:text-white transition-all cursor-pointer"
                        onClick={handleFollow}>
                        {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                    </button>
            }

        </div>
    )
}