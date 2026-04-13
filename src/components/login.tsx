"use client"

import { useRouter } from "next/navigation";

import { useState, type FormEvent } from "react";

import { useAuth } from "../context/auth-context";

import { login as loginService } from '@/src/services/auth.service';

import Loader from "./ui/loader";

import Input from "./ui/input"
import Button from "./ui/button";

import GoogleIcon from "@/public/google-icon.png";

export default function Login() {
    const router = useRouter();
    // Se trae el metodo saveSession del contexto de auth //
    const { saveSession } = useAuth() as unknown as { saveSession: (data: { user: unknown; token: string }) => void }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [loaderState, setLoaderState] = useState(false);

    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoaderState(true);

        if (email === '' || password === '') {
            setError('Debes ingresar credenciales')
            return null;
        }

        try {
            const data = await loginService(email, password) // Realiza la peticion a login y retorna el token y el usuario //
            saveSession(data) // Guarda el token y usuario en el contexto //
            router.push('/feed')
        } catch (error) {
            setError('Credenciales ingresadas incorrectas')
        } finally {
            setLoaderState(false);
        }
    }

    return (
        <>
            <div className="flex flex-col w-[95%] sm:w-[400px] rounded-lg border-2 py-4 sm:py-10 px-4 border-borders bg-card-background">
                <div className="flex flex-col items-center text-center mb-7">
                    <h1 className="text-[24px] text-main-purple">TellMe</h1>
                    <p className="text-[15px] text-gray-text ">Bienvenido de vuelta!</p>
                </div>
                <form onSubmit={login} className="flex gap-2 flex-col">
                    <Input type={'email'} title={'Correo electrónico'} placeholder="juan@ejemplo.com" value={email} setValue={setEmail} />
                    <Input type={'password'} title={'Contraseña'} placeholder="juan1234" value={password} setValue={setPassword} />
                    <div className="ml-auto mb-3">
                        <button type="button" className="text-[14px] text-main-purple hover:text-white cursor-pointer transition-all">¿Olvidaste tu contraseña?</button>
                    </div>
                    {
                        loaderState ?
                            <Loader state={loaderState} setState={setLoaderState} />
                            :
                            <Button type="submit" text="Iniciar Sesión" action={() => { }} />
                    }
                    {error && <p className="text-red text-[13px] text-center">{error}</p>}
                </form>
                <div className="flex items-center justify-center mt-5">
                    <hr className="border-borders flex-1" />
                    <p className="text-gray-text text-[12px] ml-3 mr-3">o también puedes</p>
                    <hr className="border-borders flex-1" />
                </div>
                <div className="flex flex-col justify-center text-center mt-5 text-secondary-text text-[14px]">
                    <Button icon={GoogleIcon} text="Continuar con Google" action={() => { }} />
                    <p className="mt-3">¿No tienes cuenta? <a href="/register" className="text-main-purple hover:text-white cursor-pointer transition-all">Regístrate</a></p>
                </div>
            </div>
        </>
    )
}