import styles from '../styles/components/ShowNames.module.css'



export function ShowNames(props) {
    return (
        <div>
            <h1>Drag And Drop</h1>
            <div className={styles.namesContainer}>
                {props.list.map(({ id, names }, index) => {
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