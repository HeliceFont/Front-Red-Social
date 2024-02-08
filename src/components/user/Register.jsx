import { UseForm } from "../../hooks/UseForm"
import { Global } from '../../helpers/Global'
import { useState } from "react"

export const Register = () => {
    const { form, changed } = UseForm({})
    const [saved, setSaved] = useState("not_sended");

    const saveUser = async (e) => {
        // Prevenir actualización de pantalla
        e.preventDefault()
        // Recoger datos del formulario
        let newUser = form

        // Guardar usuario en el backend 
        try {
            const request = await fetch(Global.url + "user/register", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data = await request.json()

            if (data.status == 200) {
                setSaved("saved")
            } else {
                setSaved("error")
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            setSaved("error");
        }
    }
    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Registro</h1>
            </header>
            <div className="content__posts">
                {saved === "saved" ?
                    <strong className="alert-success">Usuario Registrado correctamente  </strong>
                    : ""}

                {saved === "error" ?
                    <strong className="alert alert-success"> Usuario Registrado correctamente </strong>
                    : ""}
                
                <form id="register-form" onSubmit={saveUser}>
                    <div className="content__posts">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" onChange={changed} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="surname">Apellidos</label>
                        <input type="text" name="surname" onChange={changed} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="nick">Nick</label>
                        <input type="text" name="nick" onChange={changed} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={changed} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" onChange={changed} />
                    </div>

                    <input type="submit" value="Registrate" className="btn btn-success"></input>
                </form>
            </div>
        </>
    )
}
