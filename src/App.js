import AppStyles from './styles/App.module.scss';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import {Bar} from './components/NavBar';

export default function App() {
  return (
    <div className={AppStyles.App}>
      <Bar/>
      <SortingVisualizer/>
    </div>
  );
}
