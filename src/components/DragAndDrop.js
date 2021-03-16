import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import styles from '../styles/components/drag-drop.module.css'

export function DragAndDrop() {
    const listNames = [
        {
            id: 'firstname',
            name: 'Fabio'
        },

        {
            id: 'middlename',
            name: 'Alves'
        },

        {
            id: 'lastname',
            name: 'Ramos'
        },
    ]

    const [list, updateList] = useState(listNames);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateList(items);
        console.log(items)
    }

    return (
        <div className={styles.DnDContainer}>
            <div>
                <h1>Drag And Drop</h1>
                <div className={styles.fullname}>
                    <span>
                        {list[0].name}
                    </span>
                    <span>
                        {list[1].name}
                    </span>
                    <span>
                        {list[2].name}
                    </span>
                </div>

                <div>
                    <h1>Ordene a lista</h1>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="list">
                            {(provided) => (
                                <ul className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
                                    {list.map(({ id, name }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <p>{name}</p>
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}