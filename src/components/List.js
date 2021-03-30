import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useContext } from 'react'
import ListItems from "./ListItems"
import styles from '../styles/components/List.module.css'
import { ListContext } from '../contexts/ListContext'



export function List() {
    const { list, OnDragEnd, AddListField, AddNameField } = useContext(ListContext)


    return (
        <DragDropContext onDragEnd={OnDragEnd}>
            <Droppable droppableId="List" direction="horizontal" type="LIST" >
                {(provided) => (
                    <div>
                        <div className={styles.addField}>
                            <h1>Ordene as listas</h1>
                            <button onClick={AddListField}>
                                <img src="/add.svg" alt="" />
                            </button>
                        </div>
                        <div
                            className={styles.listContainer}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {list.map(({ id }, index) => {
                                return (
                                    <Draggable
                                        key={id}
                                        draggableId={id}
                                        index={index}>
                                        {(provided) => (
                                            <div
                                                className={styles.list}
                                                id={index} ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <span {...provided.dragHandleProps}>
                                                    <img src="/handle.svg" alt="" />
                                                </span>
                                                <div className={styles.addField}>
                                                    <h2>Lista {`${index + 1}`}</h2>
                                                    <button onClick={() => AddNameField(index)}>
                                                        <img src="/add.svg" alt="" />
                                                    </button>
                                                </div>
                                                <ListItems listSelector={index} />
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}