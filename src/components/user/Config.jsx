import { useState, useEffect } from "react"
import UseAuth from "../../hooks/UseAuth"
import { Global } from "../../helpers/Global"
import { SerializeForm } from "../../helpers/SerializeForm"


export const Config = () => {

    const { auth, setAuth } = UseAuth()

    const [saved, setSaved] = useState("not_saved")

    useEffect(() => {
        // Este efecto se ejecutará cada vez que se actualice el estado auth
        console.log("Usuario actualizado:", auth);
    }, [auth]);

    const updateUser = async (e) => {
        e.preventDefault()
        // Recoger datos del formulario
        let newDataUser = SerializeForm(e.target)

        // Borrar propiedad innecesaria
        delete newDataUser.file0

        // Actualizar usuario en la base de datos
        const request = await fetch(Global.url + "user/update", {
            method: "PUT",
            body: JSON.stringify(newDataUser),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        })
        const data = await request.json()

        if (data.status === "success") {
            // Eliminar la contraseña antes de actualizar el estado
            delete data.user.password
            console.log(auth)

            // Actualizar el estado local
            setAuth(data.user)
            
            // Establecer el estado saved
            setSaved("saved")

        } else {
            setSaved("error")
        }
    }
    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Ajustes</h1>
            </header>
            <div className="content__posts">
                {saved === "saved" ? (
                    <strong className="alert alert-success">Usuario Actualizado correctamente</strong>
                    ): ('')}

                {saved === "error" ?(
                    <strong className="alert alert-error"> El usuario no se ha actualizado. </strong>
                    ): ('')}

                <form id="config-form" onSubmit={updateUser}>
                    <div className="form-group">
                        <label htmlFor="file0">Avatar</label>

                        <div className="general-info__container-avatar">
                            {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil" />}
                            {auth.image == "default.png" && <img src={auth.image} className="container-avatar__img" alt="Foto de perfil" />}
                        </div>
                        <br />

                        <input type="file" name="file0" id="file" />
                        <br />
                    </div>
                    <br />
                    <div className="content__posts">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" defaultValue={auth.name} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="surname">Apellidos</label>
                        <input type="text" name="surname" defaultValue={auth.surname} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="nick">Nick</label>
                        <input type="text" name="nick" defaultValue={auth.nick} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="bio">Biografía</label>
                        <textarea name="bio" defaultValue={auth.bio} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" defaultValue={auth.email} />
                    </div>
                    <div className="content__posts">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" />
                    </div>

                    <br />
                    <input type="submit" value="Guardar" className="btn btn-success"></input>
                </form>
            </div>
        </>
    )
}
