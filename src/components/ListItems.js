import { Droppable, Draggable } from 'react-beautiful-dnd'
import styles from '../styles/components/ListItems.module.css'
import { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'


export default function ListItems(props) {
    const { list, editField } = useContext(ListContext)
    const listSelector = props.listSelector
    const items = list[listSelector].items

    return (
        <Droppable droppableId={list[listSelector].id} type="ITEM">
            {(provided) => (
                <ul
                    className={styles.list}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {items.map(({ id, name }, index) => {
                        return (
                            <Draggable
                                key={id}
                                draggableId={id}
                                index={index}
                            >
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <span id={`span-${listSelector}${index}${items[index].name}`}>
                                            {name}
                                        </span>
                                        <input id={`input-${listSelector}${index}${items[index].name}`} type="hidden" />
                                        <button onClick={() => editField(index, listSelector)}>
                                            <img id={`img-${listSelector}${index}${items[index].name}`} src="/edit.svg" alt="" />
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
        </Droppable >
    )
}