import Image from "next/image";

import ButtonTypes from "@/src/types/button-types";

export default function Button({ icon, text, action }: ButtonTypes) {
    return (
        <button onClick={() => action()} className="flex justify-center py-2 px-6 rounded-lg border-1 border-borders hover:bg-main-purple cursor-pointer transition-all">
            { icon ? <Image src={icon} width={20} height={20} alt="Button Icon" /> : null }
            <h3 className="text-white ml-1 text-[clamp(14px,0.5vw,20px)]">{text}</h3>
        </button>
    )
}