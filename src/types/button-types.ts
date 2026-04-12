import type { StaticImageData } from "next/image"

interface ButtonTypes {
    icon?: StaticImageData | string
    text?: string
    action: () => void
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}

export default ButtonTypes;