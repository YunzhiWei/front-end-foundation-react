import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

class BoatScheduleData {
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
    @observable _fortyBoats = [{
            "name": "赣仙游004",
            "seats": "33",
            "type": "0",
            "useSum": "25",
            "usage": "0.111607143"
        }, {
            "name": "赣仙游005",
            "seats": "33",
            "type": "0",
            "useSum": "19",
            "usage": "0.084821429"
        }, {
            "name": "赣仙游006",
            "seats": "33",
            "type": "0",
            "useSum": "16",
            "usage": "0.071428571"
        }, {
            "name": "赣仙游007",
            "seats": "33",
            "type": "0",
            "useSum": "12",
            "usage": "0.053571429"
        }, {
            "name": "赣仙游008",
            "seats": "33",
            "type": "0",
            "useSum": "3",
            "usage": "0.013392857"
        }, {
            "name": "赣仙游009",
            "seats": "33",
            "type": "0",
            "useSum": "2",
            "usage": "0.008928571"
        }, {
            "name": "赣仙游010",
            "seats": "33",
            "type": "0",
            "useSum": "4",
            "usage": "0.017857143"
        }, {
            "name": "赣仙游011",
            "seats": "33",
            "type": "0",
            "useSum": "10",
            "usage": "0.044642857"
        }, {
            "name": "赣仙游012",
            "seats": "33",
            "type": "0",
            "useSum": "8",
            "usage": "0.035714286"
        }, {
            "name": "赣仙游013",
            "seats": "33",
            "type": "0",
            "useSum": "3",
            "usage": "0.013392857"
        }, {
            "name": "赣仙游014",
            "seats": "33",
            "type": "0",
            "useSum": "2",
            "usage": "0.008928571"
        }, {
            "name": "赣仙游015",
            "seats": "33",
            "type": "0",
            "useSum": "1",
            "usage": "0.004464286"
        }, {
            "name": "赣仙游016",
            "seats": "33",
            "type": "0",
            "useSum": "2",
            "usage": "0.008928571"
        }, {
            "name": "赣仙游017",
            "seats": "60",
            "type": "0",
            "useSum": "4",
            "usage": "0.017857143"
        }, {
            "name": "董永号",
            "seats": "280",
            "type": "0",
            "useSum": "3",
            "usage": "0.013392857"
        }, {
            "name": "七仙女号",
            "seats": "180",
            "type": "0",
            "useSum": "8",
            "usage": "0.035714286"
        }, {
            "name": "捜神号",
            "seats": "120",
            "type": "0",
            "useSum": "2",
            "usage": "0.008928571"
        }, {
            "name": "龙凤号1",
            "seats": "120",
            "type": "0",
            "useSum": "3",
            "usage": "0.013392857"
        }, {
            "name": "鹊桥号",
            "seats": "120",
            "type": "0",
            "useSum": "3",
            "usage": "0.013392857"
        }, {
            "name": "舞龙湖号",
            "seats": "120",
            "type": "0",
            "useSum": "5",
            "usage": "0.022321429"
        }, {
            "name": "赣仙游080",
            "seats": "9",
            "type": "1",
            "useSum": "13",
            "usage": "0.058035714"
        }, {
            "name": "赣仙游081",
            "seats": "9",
            "type": "1",
            "useSum": "10",
            "usage": "0.044642857"
        }, {
            "name": "赣仙游082",
            "seats": "9",
            "type": "1",
            "useSum": "8",
            "usage": "0.035714286"
        }, {
            "name": "赣仙游083",
            "seats": "9",
            "type": "1",
            "useSum": "4",
            "usage": "0.017857143"
        }, {
            "name": "赣仙游102",
            "seats": "9",
            "type": "1",
            "useSum": "2",
            "usage": "0.008928571"
        }, {
            "name": "赣仙游103",
            "seats": "9",
            "type": "1",
            "useSum": "5",
            "usage": "0.022321429"
        }, {
            "name": "赣仙游105",
            "seats": "9",
            "type": "1",
            "useSum": "7",
            "usage": "0.03125"
        }, {
            "name": "赣仙游106",
            "seats": "9",
            "type": "1",
            "useSum": "2",
            "usage": "0.008928571"
        }, {
            "name": "赣仙游107",
            "seats": "9",
            "type": "1",
            "useSum": "3",
            "usage": "0.013392857"
        }, {
            "name": "赣仙游108",
            "seats": "9",
            "type": "1",
            "useSum": "1",
            "usage": "0.004464286"
        }, {
            "name": "赣仙游109",
            "seats": "9",
            "type": "1",
            "useSum": "1",
            "usage": "0.004464286"
        }, {
            "name": "赣仙游110",
            "seats": "9",
            "type": "1",
            "useSum": "2",
            "usage": "0.008928571"
        }, {
            "name": "赣仙游111",
            "seats": "9",
            "type": "1",
            "useSum": "4",
            "usage": "0.017857143"
        }, {
            "name": "赣仙游112",
            "seats": "9",
            "type": "1",
            "useSum": "6",
            "usage": "0.026785714"
        }, {
            "name": "赣仙游113",
            "seats": "9",
            "type": "1",
            "useSum": "4",
            "usage": "0.017857143"
        }, {
            "name": "织女号",
            "seats": "60",
            "type": "0",
            "useSum": "2",
            "usage": "0.008928571"
        }, {
            "name": "万年桥号",
            "seats": "60",
            "type": "0",
            "useSum": "7",
            "usage": "0.03125"
        }, {
            "name": "牛郎号",
            "seats": "80",
            "type": "0",
            "useSum": "4",
            "usage": "0.017857143"
        }, {
            "name": "七夕号",
            "seats": "51",
            "type": "0",
            "useSum": "4",
            "usage": "0.017857143"
        }]
    @observable _IOBoats = {
        inSumPrev: 0,
        inSum: 29,
        outSumPrev: 0,
        outSum: 2,
        inSumPrev2: 0,
        inSum2: 14,
        outSumPrev2: 0,
        outSum2: 0,
        inputBoats: [{
            license: "赣仙游004",
            id: 1111111111,
            type: 0,
            line: '主码头-圣集寺',
            stayStation: '圣集寺',
            time: '08:35:43'
        }, {
            license: "赣仙游006",
            type: 0,
            id: 1111111112,
            line: '主码头-圣集寺',
            stayStation: '圣集寺',
            time: '08:48:28'
        }, {
            license: "赣仙游083",
            type: 1,
            id: 1111111113,
            line: '主码头-圣集寺',
            stayStation: '圣集寺',
            time: '08:54:39'
        }, {
            license: "赣仙游013",
            type: 0,
            id: 1111111114,
            line: '主码头-圣集寺',
            stayStation: '圣集寺',
            time: '08:56:53'
        }, {
            license: "赣仙游010",
            type: 0,
            id: 1111111115,
            line: '主码头-圣集寺',
            stayStation: '圣集寺',
            time: '09:18:25'
        }, {
            license: "赣仙游102",
            type: 1,
            id: 1111111116,
            line: '主码头-圣集寺',
            stayStation: '圣集寺',
            time: '09:08:39'
        }],
        outputBoats: [{
            license: "赣仙游004",
            id: 1111111111,
            type: 0,
            line: '圣集寺-龙凤苑',
            stayStation: '主码头',
            time: '08:51:49',
            stayTime: 0
        }, {
            license: "赣仙游006",
            id: 1111111112,
            type: 0,
            line: '圣集寺-龙凤苑',
            stayStation: '主码头',
            time: '08:58:23',
            stayTime: 0
        }, {
            license: "赣仙游083",
            id: 1111111113,
            type: 1,
            line: '圣集寺-龙凤苑',
            stayStation: '主码头',
            time: '08:49:59',
            stayTime: 0.5
        }, {
            license: "赣仙游013",
            id: 1111111114,
            type: 0,
            line: '圣集寺-龙凤苑',
            stayStation: '主码头',
            time: '09:06:25',
            stayTime: 0.5
        }, {
            license: "赣仙游010",
            id: 1111111115,
            type: 0,
            line: '圣集寺-龙凤苑',
            stayStation: '主码头',
            time: '09:18:46',
            stayTime: 0
        }, {
            license: "赣仙游102",
            id: 1111111116,
            type: 1,
            line: '圣集寺-龙凤苑',
            stayStation: '主码头',
            time: '09:23:31',
            stayTime: 0
        }]
    }
    @observable _markerData = { lng: 114.801669, lat: 27.730641 };
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
    @observable _posLineWay = []
    constructor() {
        var self = this;
        var i = 0;
        // setInterval(function(){
        // 	self.updateIOBoats();
        // 	self.scrollContent(i);
        // 	i+=2;
        // }, 50000)
        self.fetchLineWay();
    }
    updateFortyBoats() {
		var i = Math.floor(Math.random() * 40);
        var usage = [81, 30, 88, 17, 60, 97, 62, 47, 10, 39, 83, 48, 23, 81, 19, 78, 95, 18, 87, 92, 50, 45, 58, 37, 55, 30, 78, 31, 61, 75, 88, 13, 93, 31, 71, 80, 72, 66, 38, 31];
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
    fetchLineWay() {
        var self = this;
        var count = 0
        var colors = ["red", "red", "red", "red", "blue", "blue", "blue"];
        axios.get('http://www.zhuxiaoyi.com:301/db').then(function(data){
            for (var i in data.data) {
                if (data.data.hasOwnProperty(i)) {
                    self._posLineWay.push({ data: data.data[i], color: colors[count++] });
                }
            }
        })
    }
}

export default BoatScheduleData;