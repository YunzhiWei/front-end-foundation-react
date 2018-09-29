import { observable } from 'mobx';
import { lineWay, dateFormat } from '../Lib';
import { FetchYG } from '../Api';
import config from '../config';

const { baidu: { ak, transCrood } } = config.common;

// 刷新间隔
const interval = 30000

//定义一些常量
const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

function transformlat(lng, lat) {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function WGS84_to_GCJ02(position) {
    let [ lng, lat ] = position.split(',');
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    } else {
        let dlat = transformlat(lng - 105.0, lat - 35.0);
        let dlng = transformlng(lng - 105.0, lat - 35.0);
        let radlat = lat / 180.0 * PI;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        let sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        let mglat = Number(lat) + Number(dlat);
        let mglng = Number(lng) + Number(dlng);
        return `${mglng},${mglat}`;
    }
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function GCJ02_to_BD09(position) {
    let [ lng, lat ] = position.split(',');
    let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return `${bd_lng},${bd_lat}`;
}

function toTransformCoordinates(Lng, lat) {
    // ehome协议上来的int型经纬度是(deg*3600+min*60+sec)*100
    // Float sec = (float) (Arith.div(num, 100.0) % 60);
    // int min = (int) ((num - sec * 100) / 100) % 3600 / 60;
    // int deg = (int) ((num - min * 60 * 100 - sec * 100) / 100 / 3600);
    // Double result = deg + Arith.div(min, 60) + Arith.div(sec, 3600);
    let position = [];
    let sec = (Lng/100) % 60;
    let min = (((Lng - sec*100)/100)%3600)/60;
    let deg = (Lng - min*60*100 - sec*100)/100/3600;
    position.push(deg + min/60 + sec/3600);
    sec = (lat/100) % 60;
    min = (((lat - sec*100)/100)%3600)/60;
    deg = (lat - min*60*100 - sec*100)/100/3600;
    position.push(deg + min/60 + sec/3600);
    return position.join(',');
}

function getGreatCircleDistance(p1, p2) {
    const EARTH_RADIUS = 6378137.0;    // Unit: meter
    const getRad = (d) => d * Math.PI / 180.0;
    const [p1_lng, p1_lat] = p1.split(',');
    const [p2_lng, p2_lat] = p2.split(',');
    let radLat1 = getRad(p1_lat);
    let radLat2 = getRad(p2_lat);
    let a = radLat1 - radLat2;
    let radLon1 = getRad(p1_lng);
    let radLon2 = getRad(p2_lng);
    let b = radLon1 - radLon2;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;
    return s;
}

// console.log(getGreatCircleDistance({ longitude: 114.80172027256632, latitude: 27.73115693118286 }, { longitude: 114.801922, latitude: 27.731177 }));

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
        inSumOfBig: 29,
        outSumPrevOfBig: 0,
        outSumOfBig: 2,
        inSumPrevOfSmall: 0,
        inSumOfSmall: 14,
        outSumPrevOfSmall: 0,
        outSumOfSmall: 0
    }
    @observable _boatsList = []
    @observable _IOBoats = {
        inputBoats: [],
        outputBoats: []
    }
    @observable _mapCenter = { lng: 114.789949, lat: 27.715516 };
    @observable _wharfList = []
    @observable _posMakers = [];
    @observable _posLineWay = []
    constructor() {
        var _this = this;
        setInterval(function(){
        	_this.updateIOBoats();
        }, interval)
        this.updateIOBoats();
        this.fetchLineWay();
    }
    async updateIOBoats() {
        const boats = {
            ["游船"]: ["牛郎号", "织女号", "鹊桥号", "董永号", "七仙女", "七夕号", "搜神号", "龙凤号", "万年桥", "舞龙湖"], 
            ["快艇"]: ["赣仙游017", "赣仙游080", "赣仙游081", "赣仙游082", "赣仙游083", "赣仙游102", "赣仙游103", "赣仙游105", "赣仙游106", "赣仙游107", "赣仙游108", "赣仙游109", "赣仙游110", "赣仙游111", "赣仙游112", "赣仙游113"]
        }
        const wharfList = {
            ["主码头"]: { lng: 114.801669, lat: 27.730641 },
            ["杨梅山"]: { lng: 114.755146, lat: 27.745420 },
            ["桃花岛"]: { lng: 114.798471, lat: 27.726868 },
            ["名人岛"]: { lng: 114.793423, lat: 27.727267 },
            ["圣集寺"]: { lng: 114.754625, lat: 27.740560 },
            ["龙凤苑"]: { lng: 114.809278, lat: 27.723758 },
            ["爱情岛"]: { lng: 114.809682, lat: 27.714180 },
            ["龙王岛"]: { lng: 114.805074, lat: 27.698925 }
        }
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
        let res = await FetchYG('/OpenApi/GetLatestShipGPSRecords');

        // 如果本地没有boatsList则根据程序生成
        if (!boatsList.length) {
            Object.keys(boats).forEach((boatType, i) => {
                boats[boatType].forEach((boatName) => {
                    boatsList.push({
                        name: boatName,
                        id: boatName,
                        type: i,
                        typeName: boatType, 
                        useSum: 0,
                        usage: 0, 
                        line: "未知",
                        stayStation: "未知",
                        startTime: '', 
                        time: '', 
                        location: ''
                    });
                });
            })
        }

        res.Data.forEach(async (boat, i) => {
            // 是否已存在于当前列表
            let isExistFlag = false
            // 转换坐标
            let positionBD = GCJ02_to_BD09(WGS84_to_GCJ02(toTransformCoordinates(boat.Longitude, boat.Latitude)));

            // 更新船只列表信息并判断游船是否已经存在于列表
            boatsList.forEach((item, j) => {
                if (boat.DeviceName === item.name) {
                    Object.assign(boatsList[j], {
                        id: boat.DeviceID,
                        time: boat.Time, 
                        location: positionBD
                    })
                    isExistFlag = true;
                }
            });
            // 不存在于当前船只列表则添加进船只列表
            if (!isExistFlag) {
                boatsList.push({
                    name: boat.DeviceName,
                    id: boat.DeviceID,
                    type: 0,
                    typeName: "游船", 
                    useSum: 0,
                    usage: 0, 
                    line: "未知",
                    stayStation: "未知",
                    startTime: boat.Time, 
                    time: boat.Time, 
                    location: positionBD
                });
            };
        })

        console.log(boatsList);

        boatsList.forEach((boat, i) => {
            boatsSum++;
            sum[boat.type]++;
            // 时间间隔大于2分钟，小于10分钟，纳入入港游船范围
            if (((new Date() - new Date(boat.time)) > 1000*60*2) && ((new Date() - new Date(boat.time)) < 1000*60*10)) {
                outSum[boat.type]++;
                let index = 0;
                let distanceMax = 0;
                let wharfNameList = Object.keys(wharfList);
                wharfNameList.forEach((wharfName, wharfI) => {
                    let { lng, lat } = wharfList[wharfName]
                    let wharfPosition = `${lng},${lat}`;
                    let distance = getGreatCircleDistance(boat.location, wharfPosition);
                    console.log(distance);
                    if (distanceMax < distance) {
                        distanceMax = distance;
                        index = wharfI;
                    }
                })
                boat.stayStation = wharfNameList[index];
                inputBoats.push(boat);
            }

            boatsListPrev.forEach((boatPrev) => {
                if (boat.name === boatPrev.name) {
                    // 时间间隔小于2分钟，纳入出港游船范围
                    if ((new Date() - new Date(boat.time)) <= 1000*60*2) {
                        outSum[boat.type]++;
                        // 时间间隔小于5分钟，且与上一次时长大于10分钟，记录出港时间
                        if (((new Date(boat.time) - new Date(boatPrev.time)) >= 1000*60*10)) {
                            boatsList[i].startTime = boat.startTime = boat.time;
                            boatsList[i].useSum++;
                            usageSum++;
                        }
                        outputBoats.push(boat);
                    }
                }
            })
            boatsList[i].usage = usageSum ? boatsList[i].useSum/usageSum : 0;
        })

        console.log(outputBoats);
        console.log(inputBoats);

        this._boatsList = boatsList;
        this.boating.prevAll = this.boating.all;
        this.boating.all = boatsSum;
        this.boating.bigAll = sum[0];
        this.boating.smallAll = sum[1];


        this.boating.prevInUse = this.boating.inUse;
        this.boating.inUse = outputBoats.length;
        this.boating.inSumPrevOfBig = this.boating.inSumOfBig;
        this.boating.outSumPrevOfBig = this.boating.outSumOfBig;
        this.boating.inSumPrevOfSmall = this.boating.inSumOfSmall;
        this.boating.outSumPrevOfSmall = this.boating.outSumOfSmall;
        this.boating.inSumOfBig = this.boating.bigAll - outSum[0];
        this.boating.outSumOfBig = outSum[0];
        this.boating.inSumOfSmall = this.boating.smallAll - outSum[1];
        this.boating.outSumOfSmall = outSum[1];
        this.boating.prevRealOut = this.boating.realOut;
        this.boating.realOut = outputBoats.length;
        this.boating.prevRealIn = this.boating.realIn;
        this.boating.realIn = inputBoats.length;
        
        this._IOBoats.outputBoats = outputBoats;
        this._IOBoats.inputBoats = inputBoats;
        this._posMakers = outputBoats;
        this._wharfList = wharfList;
        localStorage.setItem('boatsList', JSON.stringify(boatsList));
        localStorage.setItem(dateFormat(new Date(), 'yyyy-MM-dd'), usageSum);
        localStorage.removeItem(dateFormat(new Date() - 1000*3600*24, 'yyyy-MM-dd'));

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