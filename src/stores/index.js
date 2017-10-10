import Timer from './Timer';
import Counter from './Counter';
import EchartsData from './EchartsData';
import ParkingLotData from './ParkingLotData';
import BoatScheduleData from './BoatScheduleData';
import BigDataAnlsData from './BigDataAnlsData';

const stores = {
  timer: new Timer(),
  counter: new Counter(),
  echartsData: new EchartsData(),
  parkingLotData: new ParkingLotData(),
  boatScheduleData: new BoatScheduleData(),
  bigDataAnlsData: new BigDataAnlsData()
}

export default stores;
