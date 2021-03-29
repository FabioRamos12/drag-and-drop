import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from '../styles/components/ListItems.module.css'

export default function ListItems(props) {
    const listSelector = props.listSelector
    const listNames = props.list[listSelector]

    function OnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(props.list);

        const [reorderedItem] = items[listSelector].names.splice(result.source.index, 1);
        items[listSelector].names.splice(result.destination.index, 0, reorderedItem);

        props.updateList(items);
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
                        {listNames.names.map(({ name }, index) => {
                            function editField() {
                                const input = document.getElementById(`input-${listSelector}${index}${listNames.names[index]}`)
                                const span = document.getElementById(`span-${listSelector}${index}${listNames.names[index]}`)
                                const img = document.getElementById(`img-${listSelector}${index}${listNames.names[index]}`)
                                if (input.type === "hidden") {
                                    span.setAttribute("hidden", "hidden")
                                    input.setAttribute("type", "text")
                                    input.value = listNames.names[index]
                                    img.setAttribute("src", "/save.svg")
                                }
                                else {
                                    input.setAttribute("type", "hidden")
                                    span.removeAttribute("hidden")
                                    img.setAttribute("src", "/edit.svg")

                                    const newList = Array.from(props.list)
                                    const newNames = Array.from(listNames.names)
                                    newNames.splice(index, 1, input.value)
                                    newList[listSelector].names = newNames

                                    props.updateList(newList)
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
                                            <span id={`span-${listSelector}${index}${listNames.names[index]}`}>
                                                {listNames.names[index]}
                                            </span>
                                            <input id={`input-${listSelector}${index}${listNames.names[index]}`} type="hidden" />
                                            <button onClick={editField}>
                                                <img id={`img-${listSelector}${index}${listNames.names[index]}`} src="/edit.svg" alt="" />
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