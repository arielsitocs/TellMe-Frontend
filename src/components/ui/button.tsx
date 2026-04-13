import Image from "next/image";

import ButtonTypes from "@/src/types/button-types";

export default function Button({ icon, text, delete: isDelete, action, type, disabled }: ButtonTypes) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={() => action()}
            className={`flex justify-center py-2 px-6 rounded-lg border-1 border-borders transition-all ${disabled ? 'opacity-60 cursor-not-allowed' : 'opacity-100 hover:bg-main-purple cursor-pointer'}`}
        >
            {icon ? <Image src={icon} width={20} height={20} alt="Button Icon" /> : null}
            <h3 className={`${isDelete ? 'text-red' : 'text-main-text'}  ml-1 text-[clamp(14px,0.5vw,20px)]`}>{text}</h3>
        </button>
    )
}