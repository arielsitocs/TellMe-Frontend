"use client"

import Image from "next/image";

import userIcon from "../../public/user-icon.svg";
import lockIcon from "../../public/lock-icon.svg";
import mailIcon from "../../public/mail-icon.svg";
import notificationIcon from "../../public/notification-icon.svg";
import commentIcon from "../../public/comment-icon.svg";
import hiddenIcon from "../../public/hidden-icon.svg"
import sunIcon from "../../public/sun-icon.svg";
import exitIcon from "../../public/exit-icon.svg";
import deleteIcon from "../../public/delete-icon.svg";
import dropDownIcon from "../../public/drop-down-icon.svg";

import { useState } from "react";

import { useAuth } from "../context/auth-context";

import Setting from "./ui/setting";
import UpdatePassword from "../app/settings/_components/updatePassword";
import UpdateEmail from "../app/settings/_components/updateEmail";

export default function Settings() {
    const [updatePasswordState, setUpdatePasswordState] = useState(false)
    const [updateEmailState, setUpdateEmailState] = useState(false)

    const auth = useAuth() as any;

    const userid = auth?.user?.userid;

    const { clearSession } = useAuth() as any;

    return (
        <div className="mt-0 sm:mt-5 rounded-lg bg-card-background border-1 border-borders">
            <div>
                <h1 className="text-main-text font-medium text-lg p-5">Configuración</h1>
            </div>
            <div>
                <div className="bg-light-card-background">
                    <p className="font-mono text-terciary-text px-5 py-2 border-t-1 border-b-1 border-borders">CUENTA</p>
                </div>
                {/* SECCION DE CUENTA */}
                <div>
                    <Setting title="Editar perfil" description="Nombre, bio, foto y usuario" icon={userIcon} iconcolor="var(--terciary-text)" iconbgcolor="var(--transparent-purple)" linkto={`/profile/${userid}`} />
                    <Setting title="Cambiar contraseña" description="Actualiza tu contraseña de acceso" icon={lockIcon} iconcolor="var(--terciary-text)" iconbgcolor="var(--transparent-purple)" action={() => setUpdatePasswordState(!updatePasswordState)} />
                    {
                        updatePasswordState ? <UpdatePassword /> : null
                    }
                    <Setting title="Correo electrónico" description="juan@ejemplo.com" icon={mailIcon} iconcolor="var(--terciary-text)" iconbgcolor="var(--transparent-purple)" action={() => setUpdateEmailState(!updateEmailState)} />
                    {
                        updateEmailState ? <UpdateEmail /> : null
                    }
                </div>
                {/* SECCION DE PRIVACIDAD */}
                <div className="bg-light-card-background">
                    <p className="font-mono text-terciary-text px-5 py-2 border-t-1 border-b-1 border-borders">PRIVACIDAD (WIP)</p>
                </div>
                <div>
                    <Setting title="Perfil privado" description="Solo seguidores ven tus publicaciones" icon={hiddenIcon} iconcolor="#1D9E75" iconbgcolor="var(--transparent-dark-teal)" />
                    <Setting title="Notificaciones" description="Likes, comentarios y seguidores" icon={notificationIcon} iconcolor="#534AB7" iconbgcolor="var(--transparent-dark-teal)" />
                    <Setting title="Permitir comentarios" description="Cualquiera puede comentar tus posts" icon={commentIcon} iconcolor="#1D9E75" iconbgcolor="var(--transparent-dark-teal)" />
                </div>
                {/* SECCION DE APARIENCIA */}
                <div className="bg-light-card-background">
                    <p className="font-mono text-terciary-text px-5 py-2 border-t-1 border-b-1 border-borders">APARIENCIA (WIP)</p>
                </div>
                <div>
                    <Setting title="Modo claro" description="Próximamente disponible" icon={require("../../public/sun-icon.svg")} iconcolor="#D8A030" iconbgcolor="var(--transparent-ambar)" />
                </div>
                {/* SECCION DE ZONA DE PELIGRO */}
                <div className="bg-light-card-background">
                    <p className="font-mono text-red px-5 py-2 border-t-1 border-b-1 border-borders">ZONA DE PELIGRO</p>
                </div>
                <div>
                    <Setting title="Cerrar sesión" description="Salir de tu cuenta" icon={require("../../public/exit-icon.svg")} iconcolor="#E24B4A" iconbgcolor="var(--transparent-red)" action={clearSession} />
                    <Setting title="Eliminar cuenta" description="Esta acción es irreversible" icon={require("../../public/delete-icon.svg")} iconcolor="#E24B4A" iconbgcolor="var(--transparent-red)" />
                </div>

            </div>
        </div>
    )
}