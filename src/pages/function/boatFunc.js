import echarts from 'echarts';
import geoCoordMap from '../BigData/data/geoCoordMap';

function echartsOption(data, name) {
    switch(name) {
        case 'CarsDistribution':
            return carsDistributionData(data);
        case 'CarsDistribution2':
            return carsDistribution2Data(data);
        case 'CarsDistribution3':
            return carsDistribution3Data(data);
        case 'StandingTime':
            return standingTimeData(data);
        case 'IOCarsTime':
            return IOCarsTimeData(data);
        default :
            return;
    }
}

export default echartsOption;