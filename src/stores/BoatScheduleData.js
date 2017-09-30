import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

class BoatScheduleData {
	@observable _fortyBoats = [81, 30, 88, 17, 60, 97, 62, 47, 10, 39, 83, 48, 23, 81, 19, 78, 95, 18, 87, 92, 50, 45, 58, 37, 55, 30, 78, 31, 61, 75, 88, 13, 93, 31, 71, 80, 72, 66, 38, 31];
    @observable _IOBoats = {
        inSumPrev: 0,
        inSum: 0,
        outSumPrev: 0,
        outSum: 0,
        inputBoats: [{
            license: "001",
            id: 1111111111,
            line: 'X',
            stayStation: '龙王岛',
            time: '10:00:59'
        }, {
            license: "001",
            id: 1111111112,
            line: 'X',
            stayStation: '龙王岛',
            time: '10:08:59'
        }, {
            license: "001",
            id: 1111111113,
            line: 'X',
            stayStation: '龙王岛',
            time: '10:08:59'
        }, {
            license: "001",
            id: 1111111114,
            line: 'X',
            stayStation: '龙王岛',
            time: '10:08:59'
        }, {
            license: "001",
            id: 1111111115,
            line: 'X',
            stayStation: '龙王岛',
            time: '10:08:59'
        }, {
            license: "001",
            id: 1111111116,
            line: 'X',
            stayStation: '龙王岛',
            time: '10:08:59'
        }],
        outputBoats: [{
            license: "001",
            id: 1111111111,
            line: 'X',
            stayStation: '龙王岛',
            time: '20:00:59',
            stayTime: 5.5
        }, {
            license: "001",
            id: 1111111112,
            line: 'X',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "001",
            id: 1111111113,
            line: 'X',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "001",
            id: 1111111114,
            line: 'X',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "001",
            id: 1111111115,
            line: 'X',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "001",
            id: 1111111116,
            line: 'X',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }]
    }
    constructor() {
        var self = this;
        var i = 0;
        setInterval(function(){
        	self.updateFortyBoats();
        	self.updateIOBoats();
        	self.scrollContent(i);
        	i+=2;
        }, 3000)
    }
    updateFortyBoats() {
		var i = Math.floor(Math.random() * 40);
		this._fortyBoats[i] += 1
    }
    updateIOBoats() {
       this._IOBoats.inSumPrev = this._IOBoats.inSum;
       this._IOBoats.outSumPrev = this._IOBoats.outSum;
       this._IOBoats.inSum += Math.floor(Math.random() * 10);
       this._IOBoats.outSum += Math.floor(Math.random() * 5);
    }
    scrollContent(i) {
        this._IOBoats.inputBoats.map((item) => item.New = false);
        this._IOBoats.outputBoats.map((item) => item.New = false);
        this._IOBoats.inputBoats.shift();
        this._IOBoats.inputBoats.shift();
        this._IOBoats.inputBoats.push({
            license: "001",
            id: 1111111117 + i,
            line: 'X',
            stayStation: '龙王岛',
            time: '10:08:'+i,
            New: true
        }, {
            license: "001",
            id: 1111111117 + i+1,
            line: 'X',
            stayStation: '龙王岛',
            time: '10:08:'+i,
            New: true,
        });

        this._IOBoats.outputBoats.shift();
        this._IOBoats.outputBoats.push({
            license: "001",
            id: 1111111117 + i,
            logo: '大众桑塔纳',
            time: '20:08:'+i,
            stayTime: 5.5+i,
            New: true
        });
    }
}

export default BoatScheduleData;