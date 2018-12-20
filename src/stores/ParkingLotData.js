import { observable } from 'mobx';
import config from '../config';
import HikApi from './HikApi';
import { dateFormat, carLicenceCity, provinceName, deepClone, isEmpty, sleep } from '../Lib';

const { hik: { getPlotStatus, getVehicleRecords, fetchVehicleRecordFuzzy } } = config.common;
const hikApi = new HikApi();

class ParkingLotData {
    @observable plotList = []
    @observable heatmapSet = []
    @observable parking = {
        prevInUse: 0,
        inUse: 0,
        prevAll: 0,
        all: 0,
        prevRealIn: 0,
        realIn: 0,
        prevRealOut: 0,
        realOut: 0
    }
    @observable _carsDistribution = {
        mapDataSeries: [{
            name: "2017",
            data: []
        }],
        geoMapName: "江西",
    }
    @observable _carsDistribution3 = []
    @observable _IOCars = {
        inSumPrev: 0,
        inSum: 0,
        outSumPrev: 0,
        outSum: 0,
        inputCars: [],
        outputCars: []
    }
    @observable _IOCarsTime = []
    @observable _standingTime = []
    constructor() {
        setInterval((_this) => {
            _this.fetchPlotStatus();
            _this.fetchPassingCarsData();
        }, 3000, this);
        this.fetchPlotStatus();
        this.fetchPassingCarsData();
        this.toStatisticsVehicleOwnership();
    }
    async toStatisticsVehicleOwnership() {
        // 计数变量，用于获取数据的页码
        let count = 0;
        // 历史所有过车记录
        let carsList = []
        // 历史所有入车记录
        let inputCars = [];
        // 历史所有出车记录
        let outputCars = [];
        // 全国省份车辆归属地集合
        let provinceCarsSet = {}
        // 全省车辆归属地集合
        let JiangxiCarsSet = {
            ["南昌"]: 0, 
            ["赣州"]: 0, 
            ["宜春"]: 0, 
            ["吉安"]: 0, 
            ["上饶"]: 0, 
            ["抚州"]: 0, 
            ["九江"]: 0, 
            ["景德镇"]: 0, 
            ["萍乡"]: 0, 
            ["新余"]: 0, 
            ["鹰潭"]: 0
        };
        // 停留时长统计
        let standingTime = [{
            value: 0,
            name: '≤0.5h', 
            range: [0, 0.5]
        }, {
            value: 0,
            name: '0.5~1.5h', 
            range: [0.5, 1.5]
        }, {
            value: 0,
            name: '1.5~2.5h', 
            range: [1.5, 2.5]
        }, {
            value: 0,
            name: '2.5~3.5h', 
            range: [2.5, 3.5]
        }, {
            value: 0,
            name: '3.5~4.5h', 
            range: [3.5, 4.5]
        }, {
            value: 0,
            name: '4.5~5.5h', 
            range: [4.5, 5.5]
        }, {
            value: 0,
            name: '5.5~6.5h', 
            range: [5.5, 6.5]
        }, {
            value: 0,
            name: '6.5~7.5h', 
            range: [6.5, 7.5]
        }, {
            value: 0,
            name: '7.5~8.5h', 
            range: [7.5, 8.5]
        }, {
            value: 0,
            name: '8.5~9.5h', 
            range: [8.5, 9.5]
        }, {
            value: 0,
            name: '9.5~10.5h', 
            range: [9.5, 10.5]
        }, {
            value: 0,
            name: '10.5~11.5h', 
            range: [10.5, 11.5]
        }];
     
        // 循环获取历史过车记录
        while (++count) {
            const res = await hikApi.FetchHik({
                uri: getVehicleRecords, 
                body: {
                    pageNo: count,
                    pageSize: 1000,
                    startTime: new Date().getTime() - 1000*3600*24*7, 
                    endTime: new Date().getTime()
                }
            });
            try {
                if (count !== res.pageNo) return;
                carsList = carsList.concat(res.list);
                // 归类入车和出车记录
                carsList.forEach(car => car.carOut ? outputCars.push(car) : inputCars.push(car));
                // 根据出车记录进行车辆分析
                outputCars.forEach((car) => {
                    let license = car.plateNo;
                    let province = provinceName[license.slice(0, 1)];
                    let city = carLicenceCity[license.slice(0, 2)];
                    let time = car.crossTime;
                    isEmpty(provinceCarsSet[province]) ? provinceCarsSet[province] = 1 : provinceCarsSet[province]++;
                    if (province === "江西") {
                        JiangxiCarsSet[city]++;
                    }
                    inputCars.forEach((hisCar, i) => {
                        if (hisCar.plateNo === car.plateNo) {
                            let stayTime = (new Date(car.crossTime) - new Date(hisCar.crossTime))/1000/60/60;
                            standingTime.forEach((time, j) => {
                                if (time.range[0] < stayTime && time.range[1] > stayTime) {
                                    standingTime[j].value++;
                                }
                            })
                        }
                    })
                });
                this._carsDistribution.mapDataSeries[0].name = dateFormat(new Date(), 'yyyy') - 1;
                this._carsDistribution.mapDataSeries[0].data = (Object.keys(JiangxiCarsSet).map((city) => ({
                    name: `${city}市`,
                    value: JiangxiCarsSet[city]
                })));
                this._carsDistribution3 = Object.keys(provinceCarsSet).map((province) => ({
                    name: province, 
                    value: provinceCarsSet[province]
                }));
                this._standingTime = standingTime;
            } catch(err) {
                console.log("Catch An Error: ", err.message);
                return;
            }

        }
    }
    async fetchPlotStatus() {
        const isIncluded = (a,b) => !!b.filter((item) => ((item[0] <= a) && item[1] >= a)).length;
        let inUse = 0;
        // 热力图最大值
        let max = 0;
        // 停车场排序后的列表
        let plotList = [];
        // 停车场分类列表
        let plotsObject = {
            "F": [], 
            "P": [], 
            "V": []
        }
        // 停车场热力图集合
        let heatmapSet = [{
            name: "F-Part1", 
            park: "F", 
            coord: "500,400", 
            include: [[1, 37], [68, 87]], 
            value: 0
        }, {
            name: "F-Part2", 
            park: "F", 
            coord: "250,400", 
            include: [[38, 67], [88, 139]], 
            value: 0
        }, {
            name: "V-Part1", 
            park: "V", 
            coord: "440,200", 
            include: [[1, 31], [42, 70]], 
            value: 0
        }, {
            name: "V-Part2", 
            park: "V", 
            coord: "225,170", 
            include: [[32, 41], [71, 113]], 
            value: 0
        }, {
            name: "P-Part1", 
            park: "P", 
            coord: "790,230", 
            include: [[1, 176], [272, 283]], 
            value: 0
        }, {
            name: "P-Part2", 
            park: "P", 
            coord: "650,170", 
            include: [[177, 271], [284, 333]], 
            value: 0
        }];
        try{
            let response = await hikApi.FetchHik({
                uri: getPlotStatus, 
                body: {
                    pageNo: 1,
                    pageSize: 1000,
                }
            });
            response.list.forEach((item) => {
                // 车牌
                let plotNo = item.plotNo;
                // 是否被占用
                let status = item.status;
                // 车位号类型
                let park = plotNo.slice(0, 1).toLocaleUpperCase();
                // 车位号数字
                let parkNum = Number(plotNo.slice(1));
                plotsObject[park].push(item);
                heatmapSet.forEach((point, i) => {
                    if (point.park === park && isIncluded(parkNum, point.include) && !!status) {
                        heatmapSet[i].value++;
                        inUse++;
                    }
                })
            })
            Object.keys(plotsObject).forEach((item) => {
                plotsObject[item].sort((a, b) => a.plotNo.slice(1) - b.plotNo.slice(1));
                plotList = plotList.concat(plotsObject[item]);
            })
            this.plotList = plotList;
            this.heatmapSet = heatmapSet;
            this.parking.prevAll = this.parking.all;
            this.parking.all = response.list.length;
            this.parking.prevInUse = this.parking.inUse;
            this.parking.inUse = inUse;
        } catch(err) {
            console.log("Catch An Error: ", err.message);
        }
    }
    async fetchPassingCarsData() {
        let inSumPrev = this._IOCars.outSum;
        let inSum = 0;
        let outSumPrev = this._IOCars.outSum;
        let outSum = 0;
        let inputCars = [];
        let outputCars = [];
        let IOCarsTime = {
            ["08:00"]: {
                In: 0,
                Out: 0
            }, 
            ["09:00"]: {
                In: 0,
                Out: 0
            }, 
            ["10:00"]: {
                In: 0,
                Out: 0
            }, 
            ["11:00"]: {
                In: 0,
                Out: 0
            }, 
            ["12:00"]: {
                In: 0,
                Out: 0
            }, 
            ["13:00"]: {
                In: 0,
                Out: 0
            }, 
            ["14:00"]: {
                In: 0,
                Out: 0
            }, 
            ["15:00"]: {
                In: 0,
                Out: 0
            }, 
            ["16:00"]: {
                In: 0,
                Out: 0
            }, 
            ["17:00"]: {
                In: 0,
                Out: 0
            }, 
            ["18:00"]: {
                In: 0,
                Out: 0
            }, 
            ["19:00"]: {
                In: 0,
                Out: 0
            }
        }
        let res = await hikApi.FetchHik({
            uri: getVehicleRecords, 
            body: {
                pageNo: 1,
                pageSize: 1000,
                startTime: new Date(dateFormat('yyyy-MM-dd') + ' 00:00:00').getTime(), 
                endTime: new Date().getTime()
            }
        })
        let carsList = [];
        let count = 0;
        // 循环获取历史过车记录
        while (++count) {
            let res = await hikApi.FetchHik({
                uri: getVehicleRecords, 
                body: {
                    pageNo: count,
                    pageSize: 1000,
                    startTime: new Date(dateFormat('yyyy-MM-dd') + ' 00:00:00').getTime(), 
                    endTime: new Date().getTime()
                }
            })
            try{
                if (count !== res.pageNo) break;
            } catch(err) {
                console.error("Get An Error: ", err.message);
                break;
            }
            carsList = carsList.concat(res.list);
        }
        carsList.forEach((item) => {
            if (!!item.carOut) {
                if (outputCars.length < 6) {
                    let license = item.plateNo;
                    let time = item.crossTime.slice(11);
                    outputCars.push({
                        license: license,
                        id: license,
                        addr: carLicenceCity[license.slice(0, 2)],
                        crossTime: item.crossTime, 
                        time: time,
                        stayTime: 0,
                        hasGetStayTime: false
                    });
                }
                outSum++;
                let hour = item.crossTime.slice(11,13);
                if (Number(hour) < 8) {
                    IOCarsTime[`08:00`].Out++
                } else if (Number(hour) > 19) {
                    IOCarsTime[`19:00`].Out++
                } else {
                    IOCarsTime[`${hour}:00`].Out++
                }
            } else {
                outputCars.forEach((car, i) => {
                    if (car.hasGetStayTime) {
                        return;
                    } else if (item.plateNo === car.license) {
                        outputCars[i].stayTime = Math.ceil((new Date(car.crossTime) - new Date(item.crossTime))/1000/60);
                        outputCars[i].hasGetStayTime = true;
                    }
                })
                if (inputCars.length < 6) {
                    let license = item.plateNo;
                    let time = item.crossTime.slice(11);
                    inputCars.push({
                        license: license,
                        id: license,
                        addr: carLicenceCity[license.slice(0, 2)],
                        crossTime: item.crossTime, 
                        time: time,
                    })
                }
                inSum++;
                let hour = item.crossTime.slice(11,13);
                if (Number(hour) < 8) {
                    IOCarsTime[`08:00`].In++
                } else if (Number(hour) > 19) {
                    IOCarsTime[`19:00`].In++
                } else {
                    IOCarsTime[`${hour}:00`].In++
                }
            }
        })
        this._IOCars.inSumPrev = this.parking.prevRealIn = inSumPrev;
        this._IOCars.inSum = this.parking.realIn = inSum;
        this._IOCars.outSumPrev = this.parking.prevRealOut = outSumPrev;
        this._IOCars.outSum = this.parking.realOut = outSum;
        this._IOCars.inputCars = inputCars;
        this._IOCars.outputCars = outputCars;
        this._IOCarsTime = IOCarsTime;
    }
}

export default ParkingLotData;