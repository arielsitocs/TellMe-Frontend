'use client'

import { createContext, useContext, useState, useEffect } from "react"

// Se crea un contexto vacio //
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Al cargar la app recupera la sesion del localStorage //
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    // Funcion que guarda la data en las variables globales //

    const saveSession = (data) => {
        setUser(data.user)
        setToken(data.token)
        // Guarda en localStorage para persistir la sesion //
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
    }

    // Funcion que limpia la sesion y reinicia las variables //
    const clearSession = () => {
        setUser(null)
        setToken(null)
        // Limpia el localStorage //
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    // Se pasan las variabels y funciones para globalizarlas en la app //
    return (
        <AuthContext.Provider value={{ user, token, saveSession, clearSession }}>
            {children}
        </AuthContext.Provider>
    )
}

// Se exporta el objeto useAuth que contiene todas las funciones y variables //
export const useAuth = () => useContext(AuthContext)