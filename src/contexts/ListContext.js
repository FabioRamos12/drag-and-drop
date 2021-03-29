import { createContext, useState } from 'react'


export const ListContext = createContext()

export function ListProvider({ children }) {
    const DndList = [
        {
            id: '1',
            names: ['']
        },

        {
            id: '2',
            names: ['']
        },

    ]
    const [list, updateList] = useState(DndList);

    return (
        <ListContext.Provider
            value={{
                list,
                updateList
            }}
        >
            {children}
        </ListContext.Provider>
    )

}