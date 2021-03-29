import { List } from './components/List';
import styles from './styles/components/Home.module.css';
import './styles/global.css'

function App() {

  return (
    <div className={styles.DnDContainer}>
      <List />
    </div>
  );
}

export default App;


