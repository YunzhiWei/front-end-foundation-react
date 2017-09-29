import Timer from './Timer';
import Counter from './Counter';
import EchartsData from './EchartsData';
import ParkingLotData from './ParkingLotData';
import BoatScheduleData from './BoatScheduleData';

const stores = {
  timer: new Timer(),
  counter: new Counter(),
  echartsData: new EchartsData(),
  parkingLotData: new ParkingLotData(),
  boatScheduleData: new BoatScheduleData()
}

export default stores;
