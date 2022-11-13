import React, { createContext, useContext, useState } from 'react';

export const SelectedProjectContext = createContext();
export const SelectedProjectProvider = ({ children }) => {
    const [selectedProject, setSelectedProject] = useState('INBOX');
    const [active, setActive] = useState('inbox');

    return (
        <SelectedProjectContext.Provider 
           value={{selectedProject, setSelectedProject, active, setActive }}>
            {children}
        </SelectedProjectContext.Provider>
    );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);