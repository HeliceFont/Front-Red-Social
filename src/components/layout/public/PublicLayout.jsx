import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Navigate } from "react-router-dom"
import UseAuth from "../../../hooks/UseAuth"


export const PublicLayout = () => {
    const {auth} = UseAuth()
    return (
        <>
            {/* Layout */}
            <Header />

            {/* Contenido principal */}
            <section className="layout__content">
                {!auth._id ? <Outlet/>
                : 
                <Navigate to= "/social"/>
                }
            </section>
        </>
    )
}
