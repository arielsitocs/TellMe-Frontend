
import publications from "@/src/data/publications"

import SidePopularPublishment from "./ui/side-popular-publishments"

export default function PopularPublishment() {
    return (
        <div className="hidden xl:block bg-card-background border-1 border-borders rounded-lg mt-5 p-5">
            <h1 className="text-white font-medium mb-2">Popular esta semana</h1>
            <div className="flex flex-col gap-3">
                {
                    publications.map((publication, index) => (
                        <SidePopularPublishment 
                        key={index}
                        firstName={publication.firstName} 
                        lastName={publication.lastName} 
                        text={publication.text} 
                        likes={publication.likes} 
                        comments={publication.comments} />
                    ))
                }
            </div>
        </div>
    )
}