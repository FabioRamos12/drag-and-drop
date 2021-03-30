import { createContext, useState } from 'react'

export const ListContext = createContext()

export function ListProvider({ children }) {
    const DndList = []
    const [list, setList] = useState(DndList);
    const [nameNumber, setNameNumber] = useState(1)

    function OnDragEnd(result) {
        if (!result.destination) return;
        const mainList = Array.from(list);
        if (result.type === "LIST") {
            const lengh = mainList.length
            const [sourceItem] = mainList.splice(result.source.index, 1);
            mainList.splice(result.destination.index, 0, sourceItem);

            for (var i = 0; i < lengh; i++) {
                const listId = "list-" + (i + 1)
                mainList[i].id = listId
            }

            setList(mainList);
        } else {
            if (result.source.droppableId === result.destination.droppableId) {
                const listSelector = result.source.droppableId.substr(5, 1)
                const itemsList = mainList[listSelector - 1].items

                const [sourceItem] = itemsList.splice(result.source.index, 1);
                itemsList.splice(result.destination.index, 0, sourceItem);

                mainList[listSelector - 1].items = itemsList

                setList(mainList);
            } else {
                const sourceListSelector = result.source.droppableId.substr(5, 1)
                const destinationListSelector = result.destination.droppableId.substr(5, 1)

                const [sourceItem] = mainList[sourceListSelector - 1].items.splice(result.source.index, 1)
                mainList[destinationListSelector - 1].items.splice(result.destination.index, 0, sourceItem)

                setList(mainList)
            }
        }
    }

    function AddListField() {
        const newList = Array.from(list)
        const clone = {
            id: "list-" + (newList.length + 1),
            items: []
        }
        newList.push(clone)
        setList(newList)
    }

    function AddNameField(index) {
        const newName = Array.from(list)
        const clone = {
            id: "name-" + nameNumber,
            name: ''
        }
        newName[index].items.push(clone)
        setList(newName)
        setNameNumber(nameNumber + 1)
    }

    function editField(index, listSelector) {
        const items = list[listSelector].items
        const input = document.getElementById(`input-${listSelector}${index}${items[index].name}`)
        const span = document.getElementById(`span-${listSelector}${index}${items[index].name}`)
        const img = document.getElementById(`img-${listSelector}${index}${items[index].name}`)
        if (input.type === "hidden") {
            span.setAttribute("hidden", "hidden")
            input.setAttribute("type", "text")
            input.value = items[index].name
            img.setAttribute("src", "/save.svg")
        }
        else {
            input.setAttribute("type", "hidden")
            span.removeAttribute("hidden")
            img.setAttribute("src", "/edit.svg")

            const editList = Array.from(list)
            editList[listSelector].items[index].name = input.value

            setList(editList)
        }
    }

    return (
        <ListContext.Provider
            value={{
                list,
                OnDragEnd,
                AddListField,
                AddNameField,
                editField
            }}
        >
            {children}
        </ListContext.Provider>
    )
}