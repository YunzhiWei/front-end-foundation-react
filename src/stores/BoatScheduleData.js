import { observable } from 'mobx';
import { lineWay, dateFormat } from '../Lib';
import { FetchYG } from '../Api';


// 刷新间隔
const interval = 10000;

class BoatScheduleData {
    @observable boating = {
        prevInUse: 0,
        inUse: 0,
        prevAll: 0,
        all: 0,
        prevRealIn: 0,
        realIn: 0,
        prevRealOut: 0,
        realOut: 0, 
        bigAll: 0, 
        smallAll: 0, 
        inSumPrevOfBig: 0,
        inSumOfBig: 0,
        outSumPrevOfBig: 0,
        outSumOfBig: 0,
        inSumPrevOfSmall: 0,
        inSumOfSmall: 0,
        outSumPrevOfSmall: 0,
        outSumOfSmall: 0
    }
    @observable _boatsList = []
    @observable _IOBoats = {
        yc_docking: [],
        yc_leaving: [],
        kt_docking: [], 
        kt_leaving: []
    }
    @observable _mapCenter = { lng: 114.789949, lat: 27.715516 };
    @observable _wharfList = {
        ["主码头"]: { lng: 114.801669, lat: 27.730641 },
        ["杨梅山"]: { lng: 114.755146, lat: 27.745420 },
        ["桃花岛"]: { lng: 114.798471, lat: 27.726868 },
        ["名人岛"]: { lng: 114.793423, lat: 27.727267 },
        ["圣集寺"]: { lng: 114.754625, lat: 27.740560 },
        ["龙凤苑"]: { lng: 114.809278, lat: 27.723758 },
        ["爱情岛"]: { lng: 114.809682, lat: 27.714180 },
        ["龙王岛"]: { lng: 114.805074, lat: 27.698925 }
    }
    @observable _posMakers = [];
    @observable _posLineWay = [];
    @observable _boatUsageAmount = 0;
    constructor() {
        var _this = this;
        setInterval(function(){
        	_this.updateIOBoats();
        }, interval)
        this.updateIOBoats();
        this.fetchLineWay();
    }
    async updateIOBoats() {
        // 所有船只统计
        let boatsSum = 0;
        // 各类船只总计
        let sum = [0, 0];
        // 各类船只出港统计
        let outSum = [0, 0]
        // 船只使用统计
        let usageSum = JSON.parse(localStorage.getItem('boatsList') || "0")*1;


        // 船只列表
        const boatsList = JSON.parse(localStorage.getItem('boatsList') || "[]");
        const boatsListPrev = JSON.parse(localStorage.getItem('boatsList') || "[]");
        let inputBoats = [];
        let outputBoats = [];
        let boatPosition = [];

        // 获取船载GPS记录
        let boat_list = await (await fetch('http://218.87.96.224:21009/getGPSDatas')).json();
        let boat_usage_amount = (await (await fetch('http://218.87.96.224:21009/getBoatUsageAmount')).json()).sum;

        let [ boat_yc, boat_kt ] = boat_list.reduce((sum, boat) => {
            sum[boat.type*1] = sum[boat.type*1].concat([boat]);
            return sum;
        }, [[], []]);

        let [ boat_yc_docking, boat_yc_leaving ] = boat_yc.reduce((sum, boat) => {
            if (boat.is_docking) {
                sum[0].push(boat);
            } else {
                sum[1].push(boat);
            }
            return sum;
        }, [[], []]);

        let [ boat_kt_docking, boat_kt_leaving ] = boat_kt.reduce((sum, boat) => {
            if (boat.is_docking) {
                sum[0].push(boat);
            } else {
                sum[1].push(boat);
            }
            return sum;
        }, [[], []]);


        this.boating.prevInUse = this.boating.inUse;
        this.boating.prevAll = this.boating.all;
        this.boating.prevRealIn = this.boating.realIn;
        this.boating.prevRealOut = this.boating.realOut;
        this.boating.inSumPrevOfBig = this.boating.inSumOfBig;
        this.boating.outSumPrevOfBig = this.boating.outSumOfBig;
        this.boating.inSumPrevOfSmall = this.boating.inSumOfSmall;
        this.boating.outSumPrevOfSmall = this.boating.outSumOfSmall;

        this.boating.inUse = boat_yc_leaving.length + boat_kt_leaving.length;
        this.boating.all = boat_list.length;
        this.boating.realIn = boat_yc_docking.length + boat_kt_docking.length;
        this.boating.realOut = this.boating.inUse; 
        this.boating.bigAll = boat_yc.length; 
        this.boating.smallAll = boat_kt.length; 
        this.boating.inSumOfBig = boat_yc_docking.length;
        this.boating.outSumOfBig = boat_yc_leaving.length;
        this.boating.inSumOfSmall = boat_kt_docking.length;
        this.boating.outSumOfSmall = boat_kt_leaving.length;

        this._boatsList = boat_list;
        this._IOBoats.yc_docking = boat_yc_docking;
        this._IOBoats.yc_leaving = boat_yc_leaving;
        this._IOBoats.kt_docking = boat_kt_docking;
        this._IOBoats.kt_leaving = boat_kt_leaving;

        this._posMakers = boat_yc_leaving.concat(boat_kt_leaving).map((boat) => ({
            text: boat.device_name, 
            location: boat.latest_location
        }));
        this._boatUsageAmount = boat_usage_amount;

    }
    fetchLineWay() {
        var count = 0
        var colors = ["red", "red", "red", "red", "blue", "blue", "blue"];
        for (var i in lineWay) {
            if (lineWay.hasOwnProperty(i)) {
                this._posLineWay.push({ data: lineWay[i], color: colors[count++] });
            }
        }
    }
}

export default BoatScheduleData;