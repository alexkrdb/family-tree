import { createContext } from "react";


export const TreeContext = createContext()

export const Treectx = ({children, propsToPass}) => {
    return (
    <TreeContext.Provider value={propsToPass}>
        {children}
    </TreeContext.Provider>)
}