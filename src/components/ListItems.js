import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from '../styles/components/ListItems.module.css'
import { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'


export default function ListItems(props) {
    const { list, updateList } = useContext(ListContext)
    const listSelector = props.listSelector
    const Names = list[listSelector].names

    function OnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(list);

        const [reorderedItem] = items[listSelector].names.splice(result.source.index, 1);
        items[listSelector].names.splice(result.destination.index, 0, reorderedItem);

        updateList(items);
    }

    return (
        <DragDropContext onDragEnd={OnDragEnd}>
            <Droppable droppableId="ListItem">
                {(provided) => (
                    <ul
                        className={styles.list}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {Names.map(({ name }, index) => {
                            function editField() {
                                const input = document.getElementById(`input-${listSelector}${index}${Names[index]}`)
                                const span = document.getElementById(`span-${listSelector}${index}${Names[index]}`)
                                const img = document.getElementById(`img-${listSelector}${index}${Names[index]}`)
                                if (input.type === "hidden") {
                                    span.setAttribute("hidden", "hidden")
                                    input.setAttribute("type", "text")
                                    input.value = Names[index]
                                    img.setAttribute("src", "/save.svg")
                                }
                                else {
                                    input.setAttribute("type", "hidden")
                                    span.removeAttribute("hidden")
                                    img.setAttribute("src", "/edit.svg")

                                    const newList = Array.from(list)
                                    const newNames = Array.from(Names)
                                    newNames.splice(index, 1, input.value)
                                    newList[listSelector].names = newNames

                                    updateList(newList)
                                }

                            }

                            return (
                                <Draggable key={`${listSelector}${index}`} draggableId={`${listSelector}${index}`} index={index}>
                                    {(provided) => (
                                        <li
                                            id={`${listSelector}${index}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <span id={`span-${listSelector}${index}${Names[index]}`}>
                                                {Names[index]}
                                            </span>
                                            <input id={`input-${listSelector}${index}${Names[index]}`} type="hidden" />
                                            <button onClick={editField}>
                                                <img id={`img-${listSelector}${index}${Names[index]}`} src="/edit.svg" alt="" />
                                            </button>
                                        </li>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </ul>
                )
                }
            </Droppable>
        </DragDropContext>
    )
}