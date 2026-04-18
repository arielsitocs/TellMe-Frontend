import User from "./ui/user"

import { getUsers } from "../services/user.service"

import { useState, useEffect } from "react"

import { useAuth } from "../context/auth-context"

export default function Search() {
    const [users, setUsers] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<any[]>([])

    const auth = useAuth() as any;

    const user = auth?.user;

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getUsers();
            if (fetchedUsers) {
                setUsers(fetchedUsers);
                // Filtra los usuarios para que no aparezca el usuario logueado en la lista //
                const filtered = fetchedUsers.filter((u: any) => u?.userid !== user?.userid);
                setFilteredUsers(filtered);
            }
        } catch (error) {
            console.error('Error al obtener los usuarios: ', error);
        }
    }

    // Logica de barra de busqueda //
    const handleSearch = (e: any) => {
        // Contenido de la barra de busqueda //
        const searchTerm = e.target.value.toLowerCase();

        // Retorna el arrya de users filtrado si cumple alguna de estas condiciones //
        const results = users.filter((u) => {
            const isNotMe = u?.userid !== user?.userid;
            const matchesSearch = u?.firstname?.toLowerCase().includes(searchTerm)
                || u?.lastname?.toLowerCase().includes(searchTerm)
                || u?.description.toLowerCase().includes(searchTerm)

            return isNotMe && matchesSearch;
        })

        // Se retorna el resultado al array de usuarios filtrados //
        setFilteredUsers(results);
    }

    useEffect(() => {
        fetchUsers();
    }, [user?.userid])

    return (
        <div className="rounded-lg w-full border border-borders bg-card-background mt-0 sm:mt-5 overflow-hidden p-2 md:p-5">
            <div>
                <input type="text" placeholder="Buscar usuarios o publicaciones..." className=" px-4 py-2 bg-light-card-background rounded-full text-gray-text w-full" onChange={handleSearch} />
            </div>
            <div className="text-center md:text-left mt-3 md:mt-5 ml-1">
                <h1 className="text-terciary-text text-[14px] font-medium">USUARIOS SUGERIDOS</h1>
            </div>
            <div>
                {
                    filteredUsers.map((user) => (
                        <User
                            key={user.userid}
                            userid={user.userid}
                            imageurl={user.imageurl}
                            firstname={user.firstname}
                            lastname={user.lastname}
                            description={user.description}
                            posts={user.posts}
                            followers={user.followers}
                            following={user.following}
                            color={user.color}
                        />
                    ))
                }
            </div>
        </div>
    )
}