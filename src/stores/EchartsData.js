import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import { FetchYG, FetchDY } from '../Api';
import dateFormatter from '@hadesz/date-formatter';

function aqiDataGenerate(now, oneDay, value){
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
            value
        ]
    }
}
function aqiData(){
    let data = [];
    let now = +new Date(1997, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    for (let i = 0; i < 1000; i++) {
        data.push(aqiDataGenerate(now, oneDay, value));
    }
    return data;
}

class EchartsData {
    @observable ticketsNum = {
        prevOnline: 0,
        online: 0,
        prevOffline: 0,
        offline: 0,
        prevCheck: 0,
        check: 0, 
        prevLeave: 0, 
        leave: 0
    }
    @observable weather = {
        yesterday: {
            high: 0,
            low: 0,
            day: 0
        },
        today: {
            high: 0,
            low: 0,
            day: 0
        },
        future: [{
            high: 0,
            low: 0,
            day: 0
        }, {
            high: 0,
            low: 0,
            day: 0
        }, {
            high: 0,
            low: 0,
            day: 0
        }, {
            high: 0,
            low: 0,
            day: 0
        }, {
            high: 0,
            low: 0,
            day: 0
        }],
        min: 50
    }
    @observable pass = {
        category: [],
        lineData: [],
        barData: [],
        dottedBase: new Date()
    }
    @observable PM25 = {
        aqi: aqiData(),
        nowAqi: 0
    }
    @observable comfort = {
        humidity: 0,
        temperature: 0,
        comfortIndex: 0,
        comfort: ''
    }
    @observable occupantDensity = []
    constructor(){
        setInterval(function(_this){
            _this.fetchTicketsNumber();
            _this.fetchPassData();
            _this.fetchOccupantDensity();
        }, 20000, this);
        setInterval(function (_this) {
            _this.fetchWeatherData();
            _this.fetchPM25();
        }, 1000*3600, this)
        this.fetchWeatherData();
        this.fetchPM25();
        this.fetchTicketsNumber();
        this.fetchPassData();
        this.fetchOccupantDensity();
    }
    async fetchOccupantDensity() {
        let res = await FetchYG("/Service/GetQrScanData");
        this.occupantDensity = res;
    }
    async fetchPassData() {
        let res = await FetchDY(`YKZS&stdt=${dateFormatter((new Date() - 1000*3600*24*19), 'yyyy-MM-dd')}&ldti=${dateFormatter('yyyy-MM-dd')}`);
        if (res.categories.length) {
            this.pass = {
                category: res.categories,
                lineData: res.series[0].data,
                barData: res.series[0].data,
                dottedBase: new Date()
            }
        } else {
            this.pass = {
                category: [], 
                lineData: [], 
                barData: [], 
                dottedBase: new Date()
            }
        }
    }
    async fetchTicketsNumber(index) {
        let hikRes = await FetchYG("/OpenApi/GetPassengerFlowStatistics");
        let dyRes = await FetchDY("SPJP");
        let checkin, online, offline, leave;
        if (dyRes.categories.length) {
            checkin = dyRes.series[0].data[3].value
            online = dyRes.series[0].data[2].value;
            offline = dyRes.series[0].data[1].value;
        } else {
            checkin = 0;
            online = 0;
            offline = 0;
        }
        if (hikRes.Data.length) {
            leave = hikRes.Data[0].sum;
        } else {
            leave = 0;
        }
        this.ticketsNum = {
            prevOnline: this.ticketsNum.online,
            online: online,
            prevOffline: this.ticketsNum.offline,
            offline: offline,
            prevCheck: this.ticketsNum.check,
            check: checkin, 
            prevLeave: this.ticketsNum.leave, 
            leave: leave
        }
    }
    fetchWeatherData () {
        let self = this;
        let appKey = 27807;
        let sign = '3a0343bfe2324c0837afde0d26e9d0e7';
        let urlHistory = 'http://api.k780.com/?app=weather.history' + '&appkey=' + appKey + '&sign=' + sign + '&weaid=245&date=2017-08-26&format=json&jsoncallback=datayesterday';
        let urlNow = 'http://api.k780.com/?app=weather.today' + '&appkey=' + appKey + '&sign=' + sign + '&weaid=245&format=json&jsoncallback=datatoday'
        let urlForecast = 'http://api.k780.com/?app=weather.future' + '&appkey=' + appKey + '&sign=' + sign + '&weaid=245&format=json&jsoncallback=datafuture';
        let urlObj = { 'yesterday': urlHistory, 'today': urlNow, 'future': urlForecast };
        function getTemp(arr) {
            let high = arr[0].temp;
            let low = arr[0].temp;
            let now = new Date();
            now.setTime(now.getTime()-24*60*60*1000);
            let yesterday = now.getFullYear()+"-" + (now.getMonth()+1) + "-" + now.getDate();
            for (let i in arr) {
                arr[i].temp > high ? high = arr[i].temp : arr[i].temp < low ? low = arr[i].temp : '';
            }
            return { 'high': high, 'low': low, 'day': yesterday };
        }
        function fetchWeather(url, time) {
            var weatherIcon = ["icon_sunny", "icon_cloudy", "icon_overvast", "icon_shower", "icon_thundershower", "icon_lightrain", "icon_lightrain", "icon_lightrain", "icon_heavyrain", "icon_heavyrain", "icon_heavyrain", "icon_heavyrain", "icon_heavyrain", "icon_lightsnow", "icon_lightsnow", "icon_lightsnow", "icon_heavysnow", "icon_heavysnow", "icon_fog", "icon_lightrain", "icon_fog", "icon_lightrain", "icon_lightrain", "icon_heavyrain", "icon_heavyrain", "icon_lightsnow", "icon_lightsnow", "icon_heavysnow", "icon_fog", "icon_fog", "icon_fog", "icon_fog"];
            fetchJsonp(url, {
                dataType: "jsonp",
                jsonpCallback: 'custom_callback',
                jsonpCallbackFunction: 'data' + time
            }).then(function (data) {
                return data.json();
            }).then(function (json) {
                if(time === 'yesterday') {
                    self.weather[time] = getTemp(json.result);
                    findMin(self.weather[time].low);
                } else if (time === 'today') {
                    var reg = /\d+/ig;
                    var humidity = json.result.humidity.match(reg)[0]/100;
                    var temperature = json.result.temperature_curr.match(reg)[0]/1;
                    var comfortIndex = (temperature - ( 0.55 - 0.55 * humidity ) * ( temperature - 58 )).toFixed(2);
                    var comfort;
                    if (comfortIndex < 0) {
                        comfort = '极冷，不舒适';
                    } else if (comfortIndex >= 0 && comfortIndex < 26) {
                        comfort = '很冷，不舒适';
                    } else if (comfortIndex >= 26 && comfortIndex < 39) {
                        comfort = '冷，不舒适';
                    } else if (comfortIndex >= 39 && comfortIndex < 51) {
                        comfort = '少部分人不舒适';
                    } else if (comfortIndex >= 51 && comfortIndex < 71) {
                        comfort = '舒适';
                    } else if (comfortIndex >= 71 && comfortIndex < 79) {
                        comfort = '少部分人不舒适';
                    } else if (comfortIndex >= 79 && comfortIndex < 85) {
                        comfort = '热，不舒适';
                    } else if (comfortIndex >= 85 && comfortIndex < 90) {
                        comfort = '炎热，不舒适';
                    } else if (comfortIndex >= 90) {
                        comfort = '酷热，很不舒适';
                    }
                    self.weather[time] = {
                        'icon': weatherIcon[json.result.weatid],
                        'temp_curr': json.result.temp_curr + "℃",
                        'temp': json.result.temp_high + " - " + json.result.temp_low + "℃",
                        'weather': json.result.weather,
                        'wind': "风速" + json.result.winp
                    };
                    self.comfort = { 'humidity': json.result.humidity, "temperature": json.result.temperature_curr, "comfortIndex": comfortIndex, "comfort": comfort }
                    findMin(self.weather[time].low);
                } else if (time === 'future') {
                    self.weather[time] = json.result.map(function(item, i){
                        findMin(item.temp_low);
                        return {
                            'date': "星期" + "日一二三四五六日一二三四五六".charAt(new Date().getDay() + i),
                            'day': (new Date().getMonth() + 1) + "月" + (new Date().getDate() + i) + "日",
                            'icon': weatherIcon[item.weatid],
                            'temp': item.temp_high + " - " + item.temp_low + "℃",
                            'weather': item.weather,
                            'wind': "风速" + item.winp
                        }
                    })
                }
            }).catch(function(err) {
                console.error(err);
            });
        }
        function findMin(compare) {
            self.weather['min'] = compare < self.weather['min'] ? compare : self.weather['min']
        }
        for (let i in urlObj) fetchWeather(urlObj[i], i);
    }
    fetchPM25() {
        let self = this;
        let appKey = 27807;
        let sign = '3a0343bfe2324c0837afde0d26e9d0e7';
        let url = 'http://api.k780.com/?app=weather.pm25' + '&appkey=' + appKey + '&sign=' + sign + '&weaid=245&format=json&jsoncallback=data';
        fetchJsonp(url, {
            jsonpCallback: 'custom_callback',
            jsonpCallbackFunction: 'data'
        }).then(function (data) {
            return data.json();
        }).then(function (json) {
            let now = new Date();
            self.PM25.aqi.shift();
            self.PM25.aqi.push({
                name: now.toString(),
                value: [
                    [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
                    json.result.aqi
                ]
            })
            self.PM25.nowAqi = json.result.aqi;
        }).catch(function(err) {
            console.error(err);
        });
    }
}

export default EchartsData;