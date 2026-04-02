"use client"

import UserData from "@/src/components/user-data"
import SideNavigation from "@/src/components/side-navigation"
import ContentPublish from "@/src/components/content-publish"
import Publishment from "@/src/components/ui/publishment"
import publications from "@/src/data/publications"
import PopularPublishment from "@/src/components/popular-publishment"
import AppInfo from "@/src/components/app-info"

export default function Feed() {
    return (
        <main className="grid grid-cols-1 sm:grid-cols-[300px_1fr] xl:grid-cols-[300px_55%_1fr] gap-2 sm:gap-5 pt-13 px-3 py-3">
            <div>
                <UserData firstName="Juan" lastName="Díaz" description="Desarrollador web · Aprendiendo cada día" posts={142} followers={1.2} following={380} />
                <SideNavigation />
            </div>
            <div className="flex flex-col gap-2 sm:gap-5">
                <ContentPublish />
                {publications.map((publication, index) => (
                    <Publishment
                        key={`${publication.firstName}-${publication.lastName}-${index}`}
                        userImage={publication.userImage}
                        firstName={publication.firstName}
                        lastName={publication.lastName}
                        text={publication.text}
                        image={publication.image}
                        likes={publication.likes}
                        comments={publication.comments}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-2 sm:gap-5">
                <PopularPublishment />
                <AppInfo />
            </div>
        </main>
    )
}