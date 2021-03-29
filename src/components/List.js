import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useContext } from 'react'
import ListItems from "./ListItems"
import styles from '../styles/components/List.module.css'
import { ListContext } from '../contexts/ListContext'



export function List() {
    const { list, updateList } = useContext(ListContext)

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(list);

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateList(items);
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="List" direction="horizontal">
                    {(provided) => (
                        <div>
                            <h1>Ordene as listas</h1>
                            <div
                                className={styles.listContainer}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {list.map(({ id }, index) => {
                                    function AddField() {
                                        const newName = Array.from(list)
                                        newName[index].names.push('')
                                        updateList(newName)
                                    }

                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
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
                                                        <h2>Lista {id}</h2>
                                                        <button onClick={AddField}>
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
        </div>


    )
}