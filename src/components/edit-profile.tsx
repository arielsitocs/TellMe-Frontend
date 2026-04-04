import { useState, useRef } from "react";

import UserDataTypes from "../types/user-data-types";



import Image from "next/image";

import Input from "./ui/input";

import { formatName, getInitials } from "../utils/name";

export default function EditProfile({ image, firstName, lastName, description, color, state, setState }: UserDataTypes) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newDescription, setNewDescription] = useState(description)

    if (!state) return null;

    return (
        <div className="flex flex-col fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[95%] md:w-[700px] bg-alternative-card-background rounded-lg p-5 shadow-lg">
            <div className="flex border-b-1 border-borders">
                <h1 className="text-white text-lg pb-2">Editar Perfil</h1>
                <button type="button" className="text-gray-text ml-auto text-lg hover:opacity-80 cursor-pointer" onClick={() => setState?.(false)}>x</button>
            </div>
            <form action="" className="border-b-1 border-borders pb-3 flex flex-col gap-4">
                <div className="flex border-b-1 border-borders pt-5 pb-5">
                    <div className="flex items-center">
                        {image ? (
                            <Image
                                src={image}
                                width={64}
                                height={64}
                                alt="User Picture"
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 flex items-center justify-center text-white font-semibold rounded-full" style={{ backgroundColor: color }}>
                                {getInitials(firstName, lastName)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-white font-medium ml-3">Foto de perfil</h1>
                        <div className="flex items-center gap-3 mt-1 ml-2">
                            <button type="button" className="text-xs text-white rounded-full border-1 border-borders px-3 py-1 hover:bg-main-purple" onClick={() => fileInputRef.current?.click()}>Cambiar foto</button>
                            <input ref={fileInputRef} id="image-upload" type="file" className="hidden" accept="image/*" />
                            <button type="button" className="text-xs border-none text-red hover:text-white">Eliminar</button>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input type="text" title="Nombre" value={newFirstName} setValue={setNewFirstName} placeholder="" />
                    <Input type="text" title="Apellido" value={newLastName} setValue={setNewLastName} placeholder="" />
                </div>
                <div>
                    <Input type="text" title="Nombre de usuario" value={formatName(newFirstName, newLastName)} placeholder="" />
                    <p className="text-sm text-terciary-text">tu perfil: tellme.app/{formatName(newFirstName, newLastName)}</p>
                </div>
                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="text-gray-text bg-card-background p-2 rounded-lg border-1 border-borders w-full min-h-25 resize-none" />
            </form>
            <div className="flex gap-3 mt-5 ml-auto text-white font-medouim">
                <button className="px-4 py-1 border-1 border-borders rounded-full hover:opacity-80 cursor-pointer transition-all" onClick={() => setState?.(false)}>Cancelar</button>
                <button className="px-4 py-1 bg-main-purple rounded-full hover:opacity-80 cursor-pointer transition-all">Guardar cambios</button>
            </div>
        </div>
    )
}