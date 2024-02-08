import { useState } from "react"


export const UseForm = (InitialObj = {}) => {
  const[form, setForm]= useState(InitialObj)
  
  const changed =({target})=>{
    const {name, value} = target

    setForm({
        ...form,
        [name]: value
    })
    
  }
    return {
        form,
        changed
    }
  
}
