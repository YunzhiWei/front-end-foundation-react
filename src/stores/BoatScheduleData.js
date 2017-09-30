import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

class BoatScheduleData {
	@observable _fortyBoats = [81, 30, 88, 17, 60, 97, 62, 47, 10, 39, 83, 48, 23, 81, 19, 78, 95, 18, 87, 92, 50, 45, 58, 37, 55, 30, 78, 31, 61, 75, 88, 13, 93, 31, 71, 80, 72, 66, 38, 31];
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
    constructor() {
        var self = this;
        var i = 0;
        setInterval(function(){
        	self.updateFortyBoats();
        	self.updateIOCars();
        	self.scrollContent(i);
        	i+=2;
        }, 3000)
    }
    updateFortyBoats() {
		var i = Math.floor(Math.random() * 40);
		this._fortyBoats[i] += 1
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

export default BoatScheduleData;