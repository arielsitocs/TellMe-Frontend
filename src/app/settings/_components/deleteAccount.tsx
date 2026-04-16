import Input from "@/src/components/ui/input"

import Button from "@/src/components/ui/button";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/src/context/auth-context";

import { deleteUser } from "@/src/services/user.service";

import Loader from "@/src/components/ui/loader";

import { toast } from "sonner";

export default function DeleteAcoount() {
    const [confirmation, setConfirmation] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [error, setError] = useState('');
    const [loaderState, setLoaderState] = useState(false);

    const router = useRouter();

    const auth = useAuth() as any;

    const token = auth?.token;

    const user = auth?.user;

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(confirmation !== `tellme@${user.username}`) {
            setError('El mensaje de confirmación no es válido');
            return;
        }

        try {
            setLoaderState(true);
            await deleteUser(user.userid, token);
            router.push('/login')
            toast.success('Cuenta eliminada!');
        } catch (error: any) {
            setError('Error al borrar tu cuenta')
            console.error('Error al cambiar la contraseña: ', error)
        } finally {
            setLoaderState(false);
        }
    }

    return (
        <form onSubmit={update} className="flex flex-col px-5 py-3 gap-3 border-t-1 border-b-1 border-borders" >
        <Input required={true} type="text" title="Confirmación" value={confirmation} setValue={setConfirmation} placeholder={`Escribe tellme@${user.username} para confirmar la eliminación`} />
                            {error ? <div className="flex items-center ml-2"><p className="text-red font-medium">{error}</p></div> : <h1 className="text-red font-bold">Hacer esto es irreversible!</h1>}
            <div className={`flex ${loaderState ? 'justify-center' : 'justify-normal'} items-center`}>
                {loaderState ?
                    <Loader state={loaderState} setLoaderState={setLoaderState} />
                    :
                    <Button action={() => { }} text="Borrar cuenta" type="submit" delete={true} />
                }

            </div>
        </form >
    )
}