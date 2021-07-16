import AppStyles from './styles/App.module.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import {Bar} from './components/NavBar';
import { WelcomeHeader } from './components/WelcomeHeader';

export default function App() {
  return (
    <div className={AppStyles.App}>
      <Bar/>
      <WelcomeHeader/>
      <SortingVisualizer/>

    </div>
  );
}
