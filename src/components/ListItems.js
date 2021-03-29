import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from '../styles/components/ListItems.module.css'
import { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'


export default function ListItems(props) {
    const { list, updateList, editField } = useContext(ListContext)
    const listSelector = props.listSelector
    const names = list[listSelector].names

    function OnDragEndNames(result) {
        console.log(result)
        console.log(listSelector)
        if (!result.destination) return;
        const items = Array.from(list);

        const [reorderedItem] = items[listSelector].names.splice(result.source.index, 1);
        items[listSelector].names.splice(result.destination.index, 0, reorderedItem);

        updateList(items);
    }

    return (
        <DragDropContext onDragEnd={OnDragEndNames}>
            <Droppable droppableId="ListItem">
                {(provided) => (
                    <ul
                        className={styles.list}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {names.map(({ name }, index) => {
                            return (
                                <Draggable key={`${listSelector}${index}`} draggableId={`${listSelector}${index}`} index={index}>
                                    {(provided) => (
                                        <li
                                            id={`${listSelector}${index}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <span id={`span-${listSelector}${index}${names[index]}`}>
                                                {names[index]}
                                            </span>
                                            <input id={`input-${listSelector}${index}${names[index]}`} type="hidden" />
                                            <button onClick={() => editField(index, listSelector)}>
                                                <img id={`img-${listSelector}${index}${names[index]}`} src="/edit.svg" alt="" />
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