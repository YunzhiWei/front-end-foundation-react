import Timer from './Timer';
import Counter from './Counter';
import DynamicChartStore from './DynamicChartStore';

const stores = {
  timer: new Timer(),
  counter: new Counter(),
  dynamicChartStore: new DynamicChartStore()
}

export default stores;
