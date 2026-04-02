"use client"

import { useState } from "react";

import InputTypes from "@/src/types/input-types";

export default function Input({ type, title, placeholder, required, value, setValue }: InputTypes) {
    return (
        <div className="flex w-full flex-col text-secondary-text">
            <h1 className="font-semibold text-[15px] mb-1">{title}</h1>
            <input required={required} type={type} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} className="rounded-lg p-2 border border-borders"  />
        </div>
    )
}