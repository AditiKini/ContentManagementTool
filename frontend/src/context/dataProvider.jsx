import { createContext, useState } from "react";


export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [ account, setUserAccount ] = useState({ name: '', username: '' });
        
    return (
        <DataContext.Provider value={{ 
            account, 
            setUserAccount 
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;