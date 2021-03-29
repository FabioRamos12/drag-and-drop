import { List } from './components/List';
import { ShowNames } from './components/ShowNames';
import { ListProvider } from './contexts/ListContext';
import styles from './styles/components/Home.module.css';
import './styles/global.css'

function App() {

  return (
    <ListProvider>
      <div className={styles.DnDContainer}>
        <ShowNames />
        <List />
      </div>
    </ListProvider>
  );
}

export default App;


