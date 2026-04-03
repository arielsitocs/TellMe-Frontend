import Image from "next/image"

import Link from "next/link"

import SideNavigationLinkProps from "@/src/types/side-navigation-link-types"

export default function SideNavigationLink({ icon, title, linkTo }: SideNavigationLinkProps) {
    const titleClass = title === "Cerrar Sesión"
        ? "text-red text-[15px] font-medium"
        : "text-light-gray text-[15px] font-medium"

    return (
        <Link href={`/${linkTo}`} className="flex items-center gap-2 p-3 hover:bg-main-purple transition-all border-b-1 border-borders">
            <Image src={icon} width={28} height={28} alt="Link Icon" />
            <h1 className={titleClass}>{title}</h1>
        </Link>
    )
}