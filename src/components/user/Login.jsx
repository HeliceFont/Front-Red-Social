import { useState } from "react"
import { Global } from "../../helpers/Global"
import { UseForm } from "../../hooks/UseForm"



export const Login = () => {



  const { form, changed } = UseForm({})
  const [saved, setsaved] = useState("not_sended")

  const loginUser = async (e) => {
    e.preventDefault()
    // Datos del formulario
    let userToLogin = form

    // Peticion al Back para verificar que es correcta
    const request = await fetch(Global.url + 'user/login', {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "content-type": "application/json"
      }
    })

    const data = await request.json()

    if (data.status == "success") {
      // Persistir los datos en el navegador localStorage
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setsaved("login")
    } else {
      setsaved("error")
    }



  }
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">
        {saved === "saved" ?
          <strong className="alert alert-success">Usuario Registradoas correctamente  </strong>
          : ""}

        {saved === "error" ?
          <strong className="alert alert-error"> Usuario o Contraseña incorrectos </strong>
          : ""}
        <form className="form-login" onSubmit={loginUser}>

          <div className="form gtoup">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form gtoup">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <input type="submit" value="Identificate" className="btn btn-success" />
        </form>
      </div>
    </>
  )
}
