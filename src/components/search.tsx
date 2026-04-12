import User from "./ui/user"

import users from "../data/users"

export default function Search() {
    return (
        <div className="rounded-lg w-full border border-borders bg-card-background mt-0 sm:mt-5 overflow-hidden p-2 md:p-5">
            <div className="">
                <input type="text" placeholder="Buscar usuarios o publicaciones..." className=" px-4 py-2 bg-light-card-background rounded-full text-gray-text w-full" />
            </div>
            <div className="text-center md:text-left mt-3 md:mt-5 ml-1">
                <h1 className="text-terciary-text text-[14px] font-medium">USUARIOS SUGERIDOS</h1>
            </div>
            <div>
                {
                    users.map((user, index) => (
                        <User
                            key={`${user.firstname}-${user.lastname}-${index}`}
                            imageurl={user.imageurl}
                            firstname={user.firstname}
                            lastname={user.lastname}
                            description={user.description}
                            posts={user.posts}
                            followers={user.followers}
                            following={user.following}
                            color={user.color}
                        />
                    ))
                }
            </div>
        </div>
    )
}