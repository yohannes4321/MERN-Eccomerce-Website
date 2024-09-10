import { createContext, useState } from 'react';

const Context = createContext(null);

export const ContextProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false);

    return (
        <Context.Provider value={{ toggle, setToggle }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
