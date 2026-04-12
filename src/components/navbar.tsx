"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import Button from "./ui/button"

import MobileMenu from "./mobile-menu"

import MenuIcon from "@/public/menu-icon.svg";
import HomeIcon from "@/public/home-icon.svg";
import SearchIcon from "@/public/search-icon.svg"
import NotificationIcon from "@/public/notification-icon.svg";

import AppLogo from "@/public/app-logo.svg";

import { getInitials } from "../utils/name";

import { useAuth } from "../context/auth-context"

export default function NavBar() {
    const router = useRouter()

    const { user } = useAuth() as unknown as {
        user: {
            firstname?: string
            lastname?: string
            description?: string
            color?: string
        } | null
    }

    const [menuState, setMenuState] = useState(false);

    const logged = user ? true : false
    const firstname = user?.firstname || 'error'
    const lastname = user?.lastname || 'error'
    const description = user?.description || 'error'
    const color = user?.color || 'error'

    return (
        <>
            <div className="flex fixed w-full justify-between items-center px-2 sm:px-6 py-2 bg-card-background">
                <div className="flex items-center">
                    <Image src={AppLogo} width={40} alt="App Logo" className="mr-2" />
                    <h1 className="text-main-purple text-[clamp(24px,2vw,24px)]">TellMe</h1>
                    <div className="flex sm:hidden ml-2">
                        <Image src={MenuIcon} width={32} height={32} alt="Menu Icon" className="hover:scale-115 cursor-pointer" onClick={() =>  setMenuState(!menuState)} />
                    </div>
                </div>
                {
                    logged ?
                        <>
                            <div className="hidden sm:flex gap-3 ">
                                <Link className="border-1 border-borders rounded-lg py-1 px-3 hover:bg-main-purple cursor-pointer transition-all" href="/feed">
                                    <Image src={HomeIcon} width={28} height={28} alt="Home Icon" />
                                </Link>
                                <Link className="border-1 border-borders rounded-lg py-1 px-3 hover:bg-main-purple cursor-pointer transition-all" href="/search">
                                    <Image src={SearchIcon} width={28} height={28} alt="Search Icon" />
                                </Link>
                                <Link className="border-1 border-borders rounded-lg py-1 px-3 hover:bg-main-purple cursor-pointer transition-all" href="/notifications">
                                    <Image src={NotificationIcon} width={28} height={28} alt="Notification Icon" />
                                </Link>
                            </div>
                            <div className="flex items-center ">
                                <h1 className="mr-2 text-light-gray font-medium text-[14px] hidden sm:flex">Bienvenido, {firstname} {lastname}!</h1>
                                <div className="w-12 h-12 flex items-center justify-center text-white text-[16px] font-semibold rounded-full border-4 border-card-background" style={{ backgroundColor: color }}>
                                    {getInitials(firstname, lastname)}
                                </div>
                            </div>
                        </>
                        :
                        <div className="hidden sm:flex gap-5 ml-auto">
                            <Button text="Iniciar Sesión" action={() => { router.push('/login') }} />
                            <Button text="Registrarse" action={() => { router.push('/register') }} />
                        </div>
                }
            </div>
            {logged && (
                <MobileMenu
                    firstname={firstname}
                    lastname={lastname}
                    description={description}
                    posts={142}
                    followers={1.2}
                    following={380}
                    color={color}
                    state={menuState}
                    setState={setMenuState}
                />
            )}
        </>
    )
}