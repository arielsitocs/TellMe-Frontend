import UserDataTypes from "../types/user-data-types";

import Image from "next/image";

import { getInitials, formatName } from "../utils/name";

import SideNavigationLink from "./ui/side-navigation-link";

import HomeIcon from "@/public/home-icon.svg";
import ProfileIcon from "@/public/person-icon.svg";
import NotificationIcon from "@/public/notification-icon.svg";
import SearchIcon from "@/public/search-icon.svg";
import Configurationicon from "@/public/configuration-icon.svg";
import OpenDoorIcon from "@/public/open-door-icon.svg";

export default function MobileMenu({ image, firstName, lastName, color, state, setState }: UserDataTypes) {
    if (!state) return null;

    return (
        <div className="flex flex-col sm:hidden fixed top-18 left-1/2 -translate-x-1/2 w-[95%] bg-alternative-card-background shadow-lg rounded-lg p-3">
            <div className="border-b-1 border-borders">
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
                        <div className="w-16 h-16 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: color }}>
                            {getInitials(firstName, lastName)}
                        </div>
                    )}
                    <div className="ml-2">
                        <h1 className="text-white font-medium">{firstName} {lastName}</h1>
                        <p className="text-sm text-terciary-text">{formatName(firstName, lastName)}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <SideNavigationLink icon={HomeIcon} title={'Inicio'} linkTo={'feed'} />
                <SideNavigationLink icon={ProfileIcon} title={'Perfil'} linkTo={'profile'} />
                <SideNavigationLink icon={NotificationIcon} title={'Notificaciones'} linkTo={'notifications'} />
                <SideNavigationLink icon={SearchIcon} title={'Buscar'} linkTo={'search'} />
                <SideNavigationLink icon={Configurationicon} title={'Configuración'} linkTo={'settings'} />
            </div>
            <button type="button" className="w-full flex justify-center items-center border-1 border-borders mt-4 mb-4 py-2 rounded-lg hover:border-red cursor-pointer" onClick={() => setState?.(false)}>
                <Image src={OpenDoorIcon} width={30} height={30} alt="Open Door Icon" />
                <h1 className="text-red">Cerrar Sesión</h1>
            </button>
        </div>
    )
}