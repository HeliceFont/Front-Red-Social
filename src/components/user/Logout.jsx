import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UseAuth from "../../hooks/UseAuth"


export const Logout = () => {

    const {setAuth, setCounters} = UseAuth()
    const navigate = useNavigate()

    useEffect(() =>{
        // vaciar LocalStorage
        localStorage.clear();

        // Setear estados globales a vacío
        setAuth({})
        setCounters({})

        // Navigate (redireccion) al login
        navigate("/login")
    })

    return (
        <>
            <h1>Cerrando sesión...</h1>
        </>
    )
}
