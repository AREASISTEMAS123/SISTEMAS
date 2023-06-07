import  { useState } from 'react'

export const UseForms = (valorInicial={}) => {
    const [formulario, setformulario] = useState(valorInicial)

    const onInputChange = ({target}) =>{
        const {name,value} = target
        setformulario({
            [name] : value
        })
    }

    const onResetForms = () =>{
        setformulario(valorInicial)
    }
  return {
    ...formulario,
    formulario,
    onInputChange,
    onResetForms
  }
    
  
}
