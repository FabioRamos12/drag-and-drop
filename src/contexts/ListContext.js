import { createContext, useState } from 'react'


export const ListContext = createContext()

export function ListProvider({ children }) {
    const DndList = [
        {
            id: '1',
            names: ['']
        },
    ]
    const [list, updateList] = useState(DndList);

    function AddListField() {
        const newName = Array.from(list)
        const clone = {
            id: String(newName.length + 1),
            names: ['']
        }
        newName.push(clone)
        updateList(newName)
    }

    function AddNameField(index) {
        const newName = Array.from(list)
        newName[index].names.push('')
        updateList(newName)
    }

    function editField(index, listSelector) {
        const names = list[listSelector].names
        const input = document.getElementById(`input-${listSelector}${index}${names[index]}`)
        const span = document.getElementById(`span-${listSelector}${index}${names[index]}`)
        const img = document.getElementById(`img-${listSelector}${index}${names[index]}`)
        if (input.type === "hidden") {
            span.setAttribute("hidden", "hidden")
            input.setAttribute("type", "text")
            input.value = names[index]
            img.setAttribute("src", "/save.svg")
        }
        else {
            input.setAttribute("type", "hidden")
            span.removeAttribute("hidden")
            img.setAttribute("src", "/edit.svg")

            const newList = Array.from(list)
            const newNames = Array.from(names)
            newNames.splice(index, 1, input.value)
            newList[listSelector].names = newNames

            updateList(newList)
        }

    }

    return (
        <ListContext.Provider
            value={{
                list,
                updateList,
                AddListField,
                AddNameField,
                editField
            }}
        >
            {children}
        </ListContext.Provider>
    )

}