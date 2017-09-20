import Timer from './Timer';
import Counter from './Counter';
import EchartsData from './EchartsData';

const stores = {
  timer: new Timer(),
  counter: new Counter(),
  echartsData: new EchartsData()
}

export default stores;
