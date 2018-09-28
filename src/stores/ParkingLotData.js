import { observable } from 'mobx';
import config from '../config';
import HikApi from './HikApi';
import { FetchYG } from '../Api';
import { dateFormat, carLicenceCity, deepClone } from '../Lib';
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
    @observable boating = {
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
            data: [{
                name: "南昌市",
                value: 642
            }, {
                name: "九江市",
                value: 82
            }, {
                name: "宜春市",
                value: 715
            }, {
                name: "上饶市",
                value: 29
            }, {
                name: "鹰潭市",
                value: 7
            }, {
                name: "赣州市",
                 value: 203
            }, {
                name: "吉安市",
                value: 429
            }, {
                name: "萍乡市",
                value: 554
            }, {
                name: "新余市",
                value: 2232
            }, {
                name: "抚州市",
                value: 201
            }, {
                name: "景德镇市",
                value: 9
            }]
        }],
        geoMapName: "江西",
    }
    @observable _carsDistribution3 = [{
        value: 3418,
        name: '江西省'
    }, {
        value: 694,
        name: '湖南省'
    }, {
        value: 276,
        name: '上海市'
    }, {
        value: 146,
        name: '福建省'
    }, {
        value: 129,
        name: '江苏省'
    }]
    @observable _standingTime = [{
        value: 5,
        name: '≤0.5h', 
        range: [0, 0.5]
    }, {
        value: 10,
        name: '0.5~1.5h', 
        range: [0.5, 1.5]
    }, {
        value: 14,
        name: '1.5~2.5h', 
        range: [1.5, 2.5]
    }, {
        value: 13,
        name: '2.5~3.5h', 
        range: [2.5, 3.5]
    }, {
        value: 34,
        name: '3.5~4.5h', 
        range: [3.5, 4.5]
    }, {
        value: 15,
        name: '4.5~5.5h', 
        range: [4.5, 5.5]
    }, {
        value: 22,
        name: '5.5~6.5h', 
        range: [5.5, 6.5]
    }, {
        value: 15,
        name: '6.5~7.5h', 
        range: [6.5, 7.5]
    }, {
        value: 9,
        name: '7.5~8.5h', 
        range: [7.5, 8.5]
    }, {
        value: 1,
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
    }]
    @observable _IOCars = {
        inSumPrev: 0,
        inSum: 0,
        outSumPrev: 0,
        outSum: 0,
        inputCars: [],
        outputCars: []
    }
    @observable _IOCarsTime = [{
        id: 0,
        In: 0,
        Out: 0
    }, {
        id: 1,
        In: 0,
        Out: 0
    }, {
        id: 2,
        In: 0,
        Out: 0
    }, {
        id: 3,
        In: 0,
        Out: 0
    }, {
        id: 4,
        In: 0,
        Out: 0
    }, {
        id: 5,
        In: 0,
        Out: 0
    }, {
        id: 6,
        In: 0,
        Out: 0
    }, {
        id: 7,
        In: 0,
        Out: 0
    }, {
        id: 8,
        In: 0,
        Out: 0
    }, {
        id: 9,
        In: 0,
        Out: 0
    }, {
        id: 10,
        In: 0,
        Out: 0
    }, {
        id: 11,
        In: 0,
        Out: 0
    }]
    constructor() {
        var self = this;
        var i = 0;
        // setInterval(() => {
        //     self.updateIOCarsTime();
        //     self.updateIOCars();
        //     self.scrollContent(i);
        //     i+=2;
        // }, 4000);
        this.updateIOCarsTime();
        this.fetchPlotStatus();
        this.fetchPassingCarsData();
    }
    updateIOCarsTime() {
        var arrIn = [8, 14, 15, 12, 8, 6, 5, 6, 4, 2, 2, 0];
        var arrOut = [0, 1, 2, 2, 8, 7, 6, 22, 19, 4, 2, 2];
        this._IOCarsTime.map((item, i) => {
            item.In = arrIn[i];
            item.Out = arrOut[i];
        })
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
    }
    async fetchPassingCarsData() {
        let inSumPrev = this._IOCars.outSum;
        let inSum = 0;
        let outSumPrev = this._IOCars.outSum;
        let outSum = 0;
        let inputCars = [];
        let outputCars = [];
        let res = await hikApi.FetchHik({
            uri: getVehicleRecords, 
            body: {
                pageNo: 1,
                pageSize: 1000,
                // startTime: new Date(`${dateFormat(new Date(), 'yyyy-MM-dd')} 00:00:00`).getTime(), 
                // endTime: new Date().getTime()
            }
        })
        res.list.forEach((item) => {
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
            }
        })
        this._IOCars.inSumPrev = this.parking.prevRealIn = inSumPrev;
        this._IOCars.inSum = this.parking.realIn = inSum;
        this._IOCars.outSumPrev = this.parking.prevRealOut = outSumPrev;
        this._IOCars.outSum = this.parking.realOut = outSum;
        this._IOCars.inputCars = inputCars;
        this._IOCars.outputCars = outputCars;
    }
}

export default ParkingLotData;