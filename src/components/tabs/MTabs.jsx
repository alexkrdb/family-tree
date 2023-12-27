import { Tab, Tabs } from "@mui/material";
import { Children, createContext, useContext, useState } from "react";

const MTabsContext = createContext();


export const MTabsMenu = ({labels, ...props}) => {
    const {selectedTab, setSelectedTab} = useContext(MTabsContext)
    
    const handleChange = (event, newValue) => setSelectedTab(newValue)

    return ( 
        <Tabs value={selectedTab} onChange={handleChange} {...props}>
            {labels.map((label) => (
                <Tab label={label} key={label} id={labels.indexOf(label)}/>
            ))}   
        </Tabs>
     );
}

export const MTabsPanels = ({children, ...props}) => {

    const {selectedTab} = useContext(MTabsContext) 
    const index = (child) => children.indexOf(child)
    return(
        Children.map(children, child => (
            <div role="tabpanel" hidden={index(child) !== selectedTab}>
                {child}
            </div>
        ))
    );
}


const MTabs = (props) => {
    const [selectedTab, setSelectedTab] = useState(0)
    return ( 
        <MTabsContext.Provider value={{selectedTab, setSelectedTab}}>
            {props.children}
        </MTabsContext.Provider>
    );
}
 
export default MTabs;