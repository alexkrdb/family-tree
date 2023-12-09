import { createContext, useState } from "react";

export const FormContext = createContext();

export const Form = ({children, initState={}}) => {
    const [form, setForm] = useState(initState)
    return (
        <FormContext.Provider value={{form, setForm}}>
            {children}
        </FormContext.Provider>
    ) 
}