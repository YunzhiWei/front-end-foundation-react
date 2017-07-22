import Timer from './Timer';
import Counter from './Counter';
import ChartData from './ChartData';

const stores = {
  timer: new Timer(),
  counter: new Counter(),
  chartdata: new ChartData()
}

export default stores;
