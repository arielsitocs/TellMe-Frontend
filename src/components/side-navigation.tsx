"use client"

import SideNavigationLink from "./ui/side-navigation-link";

import HomeIcon from "@/public/home-icon.svg";
import ProfileIcon from "@/public/person-icon.svg";
import NotificationIcon from "@/public/notification-icon.svg";
import SearchIcon from "@/public/search-icon.svg";
import Configurationicon from "@/public/configuration-icon.svg";
import OpenDoorIcor from "@/public/open-door-icon.svg";

export default function SideNavigation() {
    return (
        <aside className="hidden sm:block bg-card-background border-1 border-borders mt-3 rounded-lg">
          <SideNavigationLink icon={HomeIcon} title={'Inicio'} linkTo={'feed'} />
          <SideNavigationLink icon={ProfileIcon} title={'Perfil'} linkTo={'profile'} />
          <SideNavigationLink icon={NotificationIcon} title={'Notificaciones'} linkTo={'notifications'} />
          <SideNavigationLink icon={SearchIcon} title={'Buscar'} linkTo={'search'} />
          <SideNavigationLink icon={Configurationicon} title={'Configuración'} linkTo={'settings'} />
          <SideNavigationLink icon={OpenDoorIcor} title="Cerrar Sesión" linkTo="login" />
        </aside>
    )
}