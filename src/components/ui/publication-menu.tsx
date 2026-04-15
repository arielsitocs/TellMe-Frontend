"use client"

import Button from "./button"

import EditIcon from "@/public/edit-icon.svg";
import DeleteIcon from "@/public/delete-icon.svg";

import { useState } from "react";

import { useAuth } from "@/src/context/auth-context";

import Loader from "./loader";

export default function PublicationMenu({ state, setState, deletePublication, editPublicationState, setEditPublicationState }: PublicationMenuTypes) {
    if (!state) return null;

    return (
        <div className="flex flex-col right-12 absolute bg-card-background p-2 gap-2 rounded-lg border-1 border-borders">
            {
                <>
                    <Button action={() => setEditPublicationState(!editPublicationState)} text="Editar publicación" icon={EditIcon} />
                    <Button action={() => deletePublication()} text="Eliminar publicación" delete={true} icon={DeleteIcon} />
                </>
            }
        </div>
    )
}