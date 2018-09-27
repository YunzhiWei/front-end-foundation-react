import EchartsData from './EchartsData';
import ParkingLotData from './ParkingLotData';
import BoatScheduleData from './BoatScheduleData';
import BigDataAnlsData from './BigDataAnlsData';
import HikApi from './HikApi';

const stores = {
  echartsData: new EchartsData(),
  parkingLotData: new ParkingLotData(),
  boatScheduleData: new BoatScheduleData(),
  bigDataAnlsData: new BigDataAnlsData(), 
  hikApi: new HikApi()
}

export default stores;
