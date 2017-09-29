import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

class ParkingLotData {
    @observable _carsDistribution = {
        mapDataSeries: [{
            name: "2018",
            data: [{
                name: "南昌市",
                value: 953
            }, {
                name: "九江市",
                value: 111
            }, {
                name: "宜春市",
                value: 222
            }, {
                name: "上饶市",
                value: 333
            }, {
                name: "鹰潭市",
                value: 444
            }, {
                name: "赣州市",
                value: 555
            }, {
                name: "吉安市",
                value: 666
            }, {
                name: "萍乡市",
                value: 777
            }, {
                name: "新余市",
                value: 888
            }, {
                name: "抚州市",
                value: 1200
            }, {
                name: "景德镇市",
                value: 999
            }, ]
        }, {
            name: "2017",
            data: [{
                name: "南昌市",
                value: 120
            }, {
                name: "九江市",
                value: 121
            }, {
                name: "宜春市",
                value: 122
            }, {
                name: "上饶市",
                value: 123
            }, {
                name: "鹰潭市",
                value: 125
            }, {
                name: "赣州市",
                value: 143
            }, {
                name: "吉安市",
                value: 154
            }, {
                name: "萍乡市",
                value: 143
            }, {
                name: "新余市",
                value: 154
            }, {
                name: "抚州市",
                value: 165
            }, {
                name: "景德镇市",
                value: 187
            }, ]
        }, {
            name: "2016",
            data: [{
                name: "南昌市",
                value: 927
            }, {
                name: "九江市",
                value: 640
            }, {
                name: "宜春市",
                value: 330
            }, {
                name: "上饶市",
                value: 657
            }, {
                name: "鹰潭市",
                value: 404
            }, {
                name: "赣州市",
                value: 168
            }, {
                name: "吉安市",
                value: 235
            }, {
                name: "萍乡市",
                value: 962
            }, {
                name: "新余市",
                value: 472
            }, {
                name: "抚州市",
                value: 589
            }, {
                name: "景德镇市",
                value: 800
            }, ]
        }],
        geoMapName: "江西",
        visualMin: 0,
        visualMax: 1200,
    }
    @observable _carsDistribution3 = [{
        value: 1335,
        name: '江西省'
    }, {
        value: 310,
        name: '福建省'
    }, {
        value: 234,
        name: '浙江省'
    }, {
        value: 135,
        name: '湖北省'
    }, {
        value: 548,
        name: '湖南省'
    }]
    @observable _standingTime = [{
        value: 135,
        name: '≤0.5h'
    }, {
        value: 310,
        name: '0.5~1.5h'
    }, {
        value: 234,
        name: '1.5~2.5h'
    }, {
        value: 135,
        name: '2.5~3.5h'
    }, {
        value: 548,
        name: '3.5~4.5h'
    }, {
        value: 1335,
        name: '4.5~5.5h'
    }, {
        value: 310,
        name: '5.5~6.5h'
    }, {
        value: 234,
        name: '6.5~7.5h'
    }, {
        value: 135,
        name: '7.5~8.5h'
    }, {
        value: 548,
        name: '8.5~9.5h'
    }, {
        value: 135,
        name: '9.5~10.5h'
    }, {
        value: 548,
        name: '10.5~11.5h'
    }]
    @observable _IOCars = {
        inSumPrev: 0,
        inSum: 0,
        outSumPrev: 0,
        outSum: 0,
        inputCars: [{
            license: "赣A9U070",
            id: 1111111111,
            logo: '奔驰',
            time: '10:00:59'
        }, {
            license: "赣C58888",
            id: 1111111112,
            logo: '宝马',
            time: '10:08:59'
        }, {
            license: "赣D58888",
            id: 1111111113,
            logo: 'GTR',
            time: '10:08:59'
        }, {
            license: "赣E58888",
            id: 1111111114,
            logo: 'AE86',
            time: '10:08:59'
        }, {
            license: "赣H58888",
            id: 1111111115,
            logo: '大众桑塔纳',
            time: '10:08:59'
        }, {
            license: "赣H58888",
            id: 1111111116,
            logo: '大众桑塔纳',
            time: '10:08:59'
        }],
        outputCars: [{
            license: "赣A9U070",
            id: 1111111111,
            logo: '奔驰',
            time: '20:00:59',
            stayTime: 5.5
        }, {
            license: "赣C58888",
            id: 1111111112,
            logo: '宝马',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "赣D58888",
            id: 1111111113,
            logo: 'GTR',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "赣E58888",
            id: 1111111114,
            logo: 'AE86',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "赣H58888",
            id: 1111111115,
            logo: '大众桑塔纳',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "赣H58888",
            id: 1111111116,
            logo: '大众桑塔纳',
            time: '20:08:59',
            stayTime: 5.5
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
        setInterval(() => {
            self.updateIOCarsTime();
            self.updateIOCars();
            self.scrollContent(i);
            i+=2;
        }, 4000);
    }
    updateIOCarsTime() {
        var arrIn = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3];
        var arrOut = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3];
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
            license: "赣H58888",
            id: 1111111117 + i,
            logo: '大众桑塔纳',
            time: '10:08:'+i,
            New: true
        }, {
            license: "赣H58888",
            id: 1111111117 + i+1,
            logo: '大众桑塔纳',
            time: '10:08:'+i,
            New: true
        });

        this._IOCars.outputCars.shift();
        this._IOCars.outputCars.push({
            license: "赣H58888",
            id: 1111111117 + i,
            logo: '大众桑塔纳',
            time: '20:08:'+i,
            stayTime: 5.5+i,
            New: true
        });
    }
}

export default ParkingLotData;