import type { StaticImageData } from "next/image"

interface ButtonTypes {
    icon?: StaticImageData | string
    text?: string
    delete?: boolean
    action: () => void
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}

export default ButtonTypes;