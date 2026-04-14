import Input from "@/src/components/ui/input"

import Button from "@/src/components/ui/button";

import { useState } from "react";

import { useAuth } from "@/src/context/auth-context";

import { updateUser } from "@/src/services/user.service";

import Loader from "@/src/components/ui/loader";

import { toast } from "sonner";

export default function UpdateEmail() {
    const [newEmail, setNewEmail] = useState('')
    const [error, setError] = useState('');
    const [loaderState, setLoaderState] = useState(false);

    const auth = useAuth() as any;

    const token = auth?.token;

    const user = auth?.user;

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoaderState(true);
            const updatedUser = {
                email: newEmail
            }

            await updateUser(user.userid, updatedUser, token)
            toast.success('Correo actualizado!')
            setNewEmail('')
        } catch (error) {
            setError('Error al cambiar tu correo')
            console.error('Error al cambiar el correo: ', error)
        } finally {
            setLoaderState(false);
        }
    }

    return (
        <form onSubmit={update} className="px-5 py-3 border-t-1 border-b-1 border-borders" >
            <Input required={true} type="email" title="Nuevo correo electrónico" value={newEmail} setValue={setNewEmail} placeholder="Ingresa tu nuevo correo..." />
            <div className={`flex ${loaderState ? 'justify-center' : 'justify-normal'} items-center mt-3`}>
                {loaderState ?
                    <Loader state={loaderState} setLoaderState={setLoaderState} />
                    :
                    <Button action={() => { }} text="Cambiar correo" type="submit" />
                }
                {error ? <div className="flex items-center ml-2"><p className="text-red font-medium">{error}</p></div> : null}
            </div>
        </form >
    )
}