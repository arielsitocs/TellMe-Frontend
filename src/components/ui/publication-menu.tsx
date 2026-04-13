"use client"

import Button from "./button"

import EditIcon from "@/public/edit-icon.svg";
import DeleteIcon from "@/public/delete-icon.svg";

import { deletePublication as removePublication } from "@/src/services/publications.service";

import { useState } from "react";

import { useAuth } from "@/src/context/auth-context";

import Loader from "./loader";

export default function PublicationMenu({ state, setState, id }: PublicationMenuTypes) {
    if (!state) return null;

    const [loaderState, setLoaderState] = useState(false);

    const { token } = useAuth() as unknown as {
        token?: string | null
    }

    const deletePublication = async () => {
        try {
            setLoaderState(true)
            await removePublication(id, token);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar la publicacion: ', error);
        } finally {
            setLoaderState(false);
        }
    }

    return (
        <div className="flex flex-col right-12 absolute bg-card-background p-2 gap-2 rounded-lg border-1 border-borders">
            {
                loaderState ?
                    <Loader />
                    :
                    <>
                        <Button action={() => { }} text="Editar publicación" icon={EditIcon} />
                        <Button action={deletePublication} text="Eliminar publicación" delete={true} icon={DeleteIcon} />
                    </>
            }

        </div>
    )
} 