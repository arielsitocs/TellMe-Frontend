"use client"

import { useState } from "react";

import Image from "next/image";

import { getInitials, formatName } from "../utils/name";

import UserDataTypes from "../types/user-data-types";

import publications from "../data/publications";

import Publishment from "./ui/publishment";
import Button from "./ui/button";

import EditProfile from "./mobile-menu";

import CalendarIcon from "@/public/calendar-icon.svg";

export default function Profile({ image, firstName, lastName, description, posts, followers, following }: UserDataTypes) {
    const filteredPubs = publications.filter((publication) => {
        return publication.firstName === firstName && publication.lastName === lastName
    })

    return (
        <>
            <div className="rounded-lg w-full border border-borders bg-card-background mt-0 sm:mt-5 px-5 py-3 overflow-hidden">
                <div>
                    <div className="flex items-center mb-3">
                        {image ? (
                            <Image
                                src={image}
                                width={64}
                                height={64}
                                alt="User Picture"
                                className="rounded-full border-4 border-card-background shadow-lg object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 flex items-center justify-center text-white font-semibold bg-main-purple rounded-full border-4 border-card-background shadow-lg">
                                {getInitials(firstName, lastName)}
                            </div>
                        )}
                        <div className="ml-auto">
                            <Button text="Editar Perfil" action={() => {}} />
                        </div>
                    </div>

                    <div className="mb-5">
                        <h1 className="text-white font-semibold text-lg">{firstName} {lastName}</h1>
                        <h3 className="text-sm text-terciary-text mb-3">{formatName(firstName, lastName)}</h3>
                        <p className="text-gray-text font-medium text-sm leading-tight">{description}</p>
                    </div>

                    <div className="flex mb-4">
                        <Image src={CalendarIcon} width={20} height={20} alt="Calendar Icon" />
                        <p className="text-sm text-terciary-text ml-1">se unió en enero de 2025</p>
                    </div>

                    <div className="flex text-white gap-5 border-t-1 border-borders pt-4 ">
                        <div className="text-center">
                            <h1 className="font-bold">{posts}</h1>
                            <span className="text-terciary-text">posts</span>
                        </div>
                        <div>
                            <h1 className="font-bold">{followers}k</h1>
                            <span className="text-terciary-text">seguidores</span>
                        </div>
                        <div>
                            <h1 className="font-bold">{following}</h1>
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
                    filteredPubs.map((publication, index) => (
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
                    ))
                }
            </div>
          
        </>
    )
}