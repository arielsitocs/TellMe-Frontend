import Input from "@/src/components/ui/input"

import Button from "@/src/components/ui/button";

import { useState, useEffect } from "react";

import axios from "axios";

import { useAuth } from "@/src/context/auth-context";

import { updatePassword } from "@/src/services/user.service";

import Loader from "@/src/components/ui/loader";

import { toast } from "sonner";

export default function UpdatePassword() {
    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [error, setError] = useState('');
    const [loaderState, setLoaderState] = useState(false);

    const auth = useAuth() as any;

    const token = auth?.token;

    const user = auth?.user;

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoaderState(true);
            const updatedPassword = {
                password: newPassword,
                currentpassword: currentPassword
            }

            await updatePassword(user.userid, updatedPassword, token);
            toast.success('Contraseña actualizada!');
            setNewPassword('');
            setCurrentPassword('');
            setError('');
        } catch (error: any) {
            if (error.response?.status === 400) {
                setError('La contraseña debe tener 6 carácteres mínimo')
                return;
            } else if (error.response?.status === 401) {
                setError('La contraseña actual no es incorrecta')
                return;
            }
            setError('Error al cambiar tu contraseña')
            console.error('Error al cambiar la contraseña: ', error)
        } finally {
            setLoaderState(false);
        }
    }

    return (
        <form onSubmit={update} className="flex flex-col px-5 py-3 gap-3 border-t-1 border-b-1 border-borders" >
            <Input required={true} type="password" title="Contraseña actual" value={currentPassword} setValue={setCurrentPassword} placeholder="Ingresa tu contraseña actual..." />
            <Input required={true} type="password" title="Nueva contraseña" value={newPassword} setValue={setNewPassword} placeholder="Ingresa tu nuevo correo..." />
            <div className={`flex ${loaderState ? 'justify-center' : 'justify-normal'} items-center`}>
                {loaderState ?
                    <Loader state={loaderState} setLoaderState={setLoaderState} />
                    :
                    <Button action={() => {}} text="Cambiar contraseña" type="submit" />
                }
                {error ? <div className="flex items-center ml-2"><p className="text-red font-medium">{error}</p></div> : null}
            </div>
        </form >
    )
}