import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

class ParkingLotData {
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
        name: '≤0.5h'
    }, {
        value: 10,
        name: '0.5~1.5h'
    }, {
        value: 14,
        name: '1.5~2.5h'
    }, {
        value: 13,
        name: '2.5~3.5h'
    }, {
        value: 34,
        name: '3.5~4.5h'
    }, {
        value: 15,
        name: '4.5~5.5h'
    }, {
        value: 22,
        name: '5.5~6.5h'
    }, {
        value: 15,
        name: '6.5~7.5h'
    }, {
        value: 9,
        name: '7.5~8.5h'
    }, {
        value: 1,
        name: '8.5~9.5h'
    }, {
        value: 0,
        name: '9.5~10.5h'
    }, {
        value: 0,
        name: '10.5~11.5h'
    }]
    @observable _IOCars = {
        inSumPrev: 0,
        inSum: 133,
        outSumPrev: 0,
        outSum: 8,
        inputCars: [{
            license: "赣K9U070",
            id: 1111111111,
            addr: '新余',
            time: '10:03:19'
        }, {
            license: "赣K5J581",
            id: 1111111112,
            addr: '新余',
            time: '10:05:36'
        }, {
            license: "赣A9U070",
            id: 1111111113,
            addr: '南昌',
            time: '10:06:44'
        }, {
            license: "赣KG7297",
            id: 1111111114,
            addr: '新余',
            time: '10:09:01'
        }, {
            license: "赣KF6681",
            id: 1111111115,
            addr: '新余',
            time: '10:10:59'
        }, {
            license: "赣CL2A59",
            id: 1111111116,
            addr: '宜春',
            time: '10:12:46'
        }, {
            license: "赣A9U070",
            id: 1111111117,
            addr: '南昌',
            time: '10:14:32'
        }],
        outputCars: [{
            license: "赣KL6780",
            id: 1111111111,
            addr: '新余',
            time: '08:53:59',
            stayTime: 18
        }, {
            license: "赣KA5813",
            id: 1111111112,
            addr: '新余',
            time: '09:15:32',
            stayTime: 32
        }, {
            license: "赣K9381A",
            id: 1111111113,
            addr: '新余',
            time: '09:17:34',
            stayTime: 25
        }, {
            license: "赣A417C5",
            id: 1111111114,
            addr: '南昌',
            time: '09:38:23',
            stayTime: 6
        }, {
            license: "赣KM2380",
            id: 1111111115,
            addr: '新余',
            time: '10:03:25',
            stayTime: 73
        }, {
            license: "赣K89A01",
            id: 1111111116,
            addr: '新余',
            time: '10:09:58',
            stayTime: 49
        }, {
            license: "赣K94U81",
            id: 1111111117,
            addr: '新余',
            time: '10:12:23',
            stayTime: 49
        }, {
            license: "赣K5Z439",
            id: 1111111118,
            addr: '新余',
            time: '10:14:11',
            stayTime: 49
        }]
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
            // self.updateIOCarsTime();
            // self.updateIOCars();
            // self.scrollContent(i);
            // i+=2;
        // }, 4000);
        self.updateIOCarsTime();
    }
    updateIOCarsTime() {
        var arrIn = [8, 14, 15, 12, 8, 6, 5, 6, 4, 2, 2, 0];
        var arrOut = [0, 1, 2, 2, 8, 7, 6, 22, 19, 4, 2, 2];
        this._IOCarsTime.map((item, i) => {
            item.In = arrIn[i];
            item.Out = arrOut[i];
        })
    }
    updateIOCars() {
       this._IOCars.inSumPrev = this._IOCars.inSum;
       this._IOCars.outSumPrev = this._IOCars.outSum;
       this._IOCars.inSum += Math.floor(Math.random() * 10);
       this._IOCars.outSum += Math.floor(Math.random() * 5);
    }
    scrollContent(i) {
        this._IOCars.inputCars.map((item) => item.New = false);
        this._IOCars.outputCars.map((item) => item.New = false);
        this._IOCars.inputCars.shift();
        this._IOCars.inputCars.shift();
        this._IOCars.inputCars.push({
            license: "赣K3A187",
            id: 1111111117 + i,
            addr: '新余',
            time: '10:08:'+i,
            New: true
        }, {
            license: "赣K55AE8",
            id: 1111111117 + i+1,
            addr: '新余',
            time: '10:08:'+i,
            New: true
        });

        this._IOCars.outputCars.shift();
        this._IOCars.outputCars.push({
            license: "赣K28B0A",
            id: 1111111117 + i,
            addr: '新余',
            time: '20:08:'+i,
            stayTime: 5.5+i,
            New: true
        });
    }
}

export default ParkingLotData;