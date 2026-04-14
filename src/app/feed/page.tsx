"use client"

import UserData from "@/src/components/user-data"
import SideNavigation from "@/src/components/side-navigation"
import ContentPublish from "@/src/components/content-publish"
import Publishment from "@/src/components/ui/publication"
import PopularPublishment from "@/src/components/popular-publishment"
import AppInfo from "@/src/components/app-info"
import Loader from "@/src/components/ui/loader"

import { useEffect, useState } from "react"

import { getPublications as fetchPublications } from "@/src/services/publications.service"

import { useAuth } from "@/src/context/auth-context"

export default function Feed() {
    const { user } = useAuth() as unknown as {
        user: {
            userid?: number
            firstname?: string
            lastname?: string
            username?: string
            description?: string
            color?: string
            posts?: number
            followers?: number
            following?: number
        } | null
    }

    const [publications, setPublications] = useState<any[]>([])
    const [loaderState, setLoaderState] = useState(false)

    const userid = user?.userid ?? 616
    const firstname = user?.firstname ?? 'error'
    const lastname = user?.lastname ?? 'error'
    const username = user?.username ?? 'error'
    const description = user?.description ?? 'error'
    const color = user?.color ?? '#FFFFFF'
    const posts = user?.posts ?? 0
    const followers = user?.followers ?? 0
    const following = user?.following ?? 0

    const loadPublications = async () => {
        setLoaderState(true)
        try {
            const data = await fetchPublications()
            setPublications(data)
        } catch (error: any) {
            throw new Error(error)
        } finally {
            setLoaderState(false)
        }
    }

    // Funcion que filtra de inmediato las publicaciones al borrar una, mostrando el resultado al momento aunque no haya terminado //
    const handleDeleteFromState = (id: number) => {
        setPublications(prev => prev.filter(p => p.publicationid !== id));
    };

    useEffect(() => {
        loadPublications()
    }, [])

    return (
        <main className="grid grid-cols-1 sm:grid-cols-[300px_1fr] xl:grid-cols-[300px_55%_1fr] gap-2 sm:gap-5 pt-13 px-3 py-3">
            <div>
                <UserData userid={userid} firstname={firstname} lastname={lastname} username={username} description={description} posts={posts} followers={followers} following={following} color={color} />
                <SideNavigation />
            </div>
            <div className="flex flex-col gap-2 sm:gap-5">
                <ContentPublish />
                {
                    loaderState ?
                        <Loader state={loaderState} setState={setLoaderState} />
                        :
                        publications.length === 0 ?
                            <div className="w-full py-15 rounded-lg bg-card-background text-secondary-text text-center">
                                <h1>No hay publicaciones creadas!</h1>
                            </div>
                            :
                            publications.map((publication, index) => (
                                <Publishment
                                    key={index}
                                    publicationid={publication.publicationid}
                                    userid={publication.userid}
                                    content={publication.content}
                                    imageurl={publication.imageurl}
                                    likes={publication.likes}
                                    comments={publication.comments}
                                    onDelete={handleDeleteFromState}
                                />
                            ))
                }

            </div>
            <div className="flex flex-col gap-2 sm:gap-5">
                <PopularPublishment />
                <AppInfo />
            </div>
        </main>
    )
}