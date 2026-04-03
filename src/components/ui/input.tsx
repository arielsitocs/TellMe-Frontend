"use client"

import InputTypes from "@/src/types/input-types";

export default function Input({ type, title, placeholder, required, value, setValue }: InputTypes) {
    return (
        <div className="flex w-full flex-col text-secondary-text">
            <h1 className="font-semibold text-[15px] mb-1">{title}</h1>
            <input required={required} type={type} placeholder={placeholder} value={value} onChange={setValue ? (e) => setValue(e.target.value) : undefined} readOnly={!setValue} className="rounded-lg p-2 border border-borders"  />
        </div>
    )
}