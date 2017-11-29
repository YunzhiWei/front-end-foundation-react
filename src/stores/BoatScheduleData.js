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
            license: "游001",
            id: 1111111111,
            line: '线路A',
            stayStation: '龙王岛',
            time: '10:00:59'
        }, {
            license: "游002",
            id: 1111111112,
            line: '线路B',
            stayStation: '龙王岛',
            time: '10:08:59'
        }, {
            license: "游003",
            id: 1111111113,
            line: '线路B',
            stayStation: '龙王岛',
            time: '10:08:59'
        }, {
            license: "游004",
            id: 1111111114,
            line: '线路A',
            stayStation: '龙王岛',
            time: '10:08:59'
        }, {
            license: "游002",
            id: 1111111115,
            line: '线路C',
            stayStation: '龙王岛',
            time: '10:08:59'
        }, {
            license: "游001",
            id: 1111111116,
            line: '线路A',
            stayStation: '龙王岛',
            time: '10:08:59'
        }],
        outputBoats: [{
            license: "游004",
            id: 1111111111,
            line: '线路C',
            stayStation: '龙王岛',
            time: '20:00:59',
            stayTime: 5.5
        }, {
            license: "游002",
            id: 1111111112,
            line: '线路A',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "游003",
            id: 1111111113,
            line: '线路B',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "游005",
            id: 1111111114,
            line: '线路C',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "游001",
            id: 1111111115,
            line: '线路A',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }, {
            license: "游001",
            id: 1111111116,
            line: '线路B',
            stayStation: '龙王岛',
            time: '20:08:59',
            stayTime: 5.5
        }]
    }
    @observable _posMakers = [{
        text: "游船001",
        location: "114.84183,27.711712"
    }, {
        text: "游船001",
        location: "114.807565,27.717436"
    }, {
        text: "游船001",
        location: "114.817354,27.724353"
    }, {
        text: "游船001",
        location: "114.824563,27.735208"
    }, {
        text: "游船001",
        location: "114.838324,27.704532"
    }, {
        text: "游船001",
        location: "114.815384,27.690257"
    }, {
        text: "游船001",
        location: "114.785437,27.722742"
    }, {
        text: "游船001",
        location: "114.794536,27.713787"
    }, {
        text: "游船001",
        location: "114.813782,27.693458"
    }, {
        text: "游船001",
        location: "114.833381,27.719736"
    }, {
        text: "游船001",
        location: "114.851111,27.704538"
    }];
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
        var boatArr = ['游001', '游002', '游003', '游004', '游005']
        var lineArr = ['线路A', '线路B', '线路C', '线路D'];
        var stayArr = ['龙王岛', '情人岛', '爱情岛', '名人岛', '圣集寺', '主码头', '杨梅岭']
        function getNowFormatDate() {
            var date = new Date();
            var seperator = ":";
            var currentdate = date.getHours() + seperator + date.getMinutes()
                    + seperator + date.getSeconds();
            return currentdate;
        }
        this._IOBoats.inputBoats.map((item) => item.New = false);
        this._IOBoats.outputBoats.map((item) => item.New = false);
        this._IOBoats.inputBoats.shift();
        this._IOBoats.inputBoats.shift();
        this._IOBoats.inputBoats.push({
            license: boatArr[Math.floor(Math.random() * 5)],
            id: 1111111117 + i,
            line: lineArr[Math.floor(Math.random() * 4)],
            stayStation: stayArr[Math.floor(Math.random() * 7)],
            time: getNowFormatDate(),
            New: true
        }, {
            license: boatArr[Math.floor(Math.random() * 5)],
            id: 1111111117 + i+1,
            line: lineArr[Math.floor(Math.random() * 4)],
            stayStation: stayArr[Math.floor(Math.random() * 7)],
            time: getNowFormatDate(),
            New: true,
        });

        this._IOBoats.outputBoats.shift();
        this._IOBoats.outputBoats.push({
            license: boatArr[Math.floor(Math.random() * 5)],
            id: 1111111117 + i,
            logo: '大众桑塔纳',
            time: getNowFormatDate(),
            stayTime: 5.5+i,
            New: true
        });
    }
}

export default BoatScheduleData;