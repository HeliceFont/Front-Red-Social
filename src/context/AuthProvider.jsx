import { useState, useEffect, createContext } from "react"
import { Global } from "../helpers/Global"
import PropTypes from 'prop-types';
// import { Feed } from "../components/publication/Feed"


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    

    const [auth, setAuth] = useState({})
    const [counters, setCounters] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        authUser();
    }, [])

    const authUser = async ()=> {
        try{
        // Sacar datos del usuario identificado del localStorage
        const token =   localStorage.getItem("token")
        const user = localStorage.getItem("user")

        // Comprobar si tengo el token y el usser
        if(!token || !user){
            setLoading(false)
            return false
        }
        // Transformar los datos a un objeto de JavaScript
        const userObj = JSON.parse(user)
        const userId = userObj.id

        // Petición ajax al Backend que compruebe el token y
        // que me devuelva todos los datos del usuario
        
        const request = await fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": token
            }
        })

        const data = await request.json()
        // Petición para los contadores de seguidores y publicaciones
        const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": token
            }
        })
        const dataCounters = await requestCounters.json()

        // Setear el estado de auth
        setAuth(data.user)
        setCounters(dataCounters)
        setLoading(false)
        }catch(error) {
            console.error('Error al autenticar al usuario:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, counters, setCounters, loading }}>
            {/* <Feed/> */}
            {children}
        </AuthContext.Provider>
    )
}
// Validación de Propiedades, se suguiere como buena practica
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export  {
    AuthContext, 
    AuthProvider
}
