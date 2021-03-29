import { useContext } from 'react';
import { ListContext } from '../contexts/ListContext';
import styles from '../styles/components/ShowNames.module.css'



export function ShowNames() {
    const { list } = useContext(ListContext)
    return (
        <div>
            <h1>Drag And Drop</h1>
            <div className={styles.namesContainer}>
                {list.map(({ id, names }) => {
                    return (
                        <div key={id}>
                            {names.map(({ id }, index) => {
                                return (
                                    <span key={index}>{names[index]}</span>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}