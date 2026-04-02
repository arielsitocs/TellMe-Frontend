import type { StaticImageData } from "next/image"

interface SideNavigationLinkProps {
    icon: StaticImageData
    title: string
    linkTo: string
}

export default SideNavigationLinkProps;