"use client"

import { useState } from "react"

import Image from "next/image";

import Input from "./ui/input"
import Button from "./ui/button";

import UserIcon from "@/public/person-icon.svg";

export default function Register() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex flex-col w-[95%] md:w-fit rounded-lg border-2 py-4 sm:py-10 mt-18 sm:mt-10 px-4 border-borders bg-card-background">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-[24px] text-main-purple">TellMe</h1>
                <p className="text-[15px] text-gray-text">Crea tu cuenta gratis</p>
            </div>
            <form action="" className="flex gap-2 flex-col mt-2 ">
                <div className="flex justify-center">
                    <label htmlFor="avatar-upload" className="flex w-fit p-3 justify-center mb-2 mt-2 rounded-full bg-main-purple border-2 border-light-gray border-dashed hover:translate-y-[-5px] hover:opacity-80 cursor-pointer transition-all">
                        <Image src={UserIcon} alt="User Icon" />
                    </label>
                    <input id="avatar-upload" type="file" className="hidden" accept="image/*" />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input type={'text'} title={'Nombre'} placeholder="Juan" value={name} setValue={setName} required={true} />
                    <Input type={'text'} title={'Apellido'} placeholder="Díaz" value={lastName} setValue={setLastName} required={true} />
                </div>
                <Input type={'text'} title={'Nombre de usuario'} placeholder="juandiaz1234" value={username} setValue={setUsername} required={true} />
                <Input type={'email'} title={'Correo electrónico'} placeholder="juan@ejemplo.com" value={email} setValue={setEmail} required={true} />
                <Input type={'password'} title={'Contraseña'} placeholder="juan1234" value={password} setValue={setPassword} required={true} />
                <span className="mt-2"></span>
                <Button text="Crear Cuenta" action={() => { }} />
            </form>
            <div className="flex items-center justify-center mt-5">
                <hr className="border-borders flex-1" />
                <p className="text-gray-text text-[12px] ml-3 mr-3">O</p>
                <hr className="border-borders flex-1" />
            </div>
            <div className="flex flex-col justify-center text-center mt-2 text-secondary-text text-[14px]">
                <p className="mt-3">¿Ya tienes una cuenta? <a href="/login" className="text-main-purple hover:text-white cursor-pointer transition-all">Inicia sesión</a></p>
            </div>

        </div>
    )
}