import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

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
    @observable parking = {
        inUsePrev: 0,
        inUse: 0,
        allPrev: 0,
        all: 0
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
    constructor(){
        var i = 0;
        var self = this;
        setInterval(function(){
            i = i === 5 ? 1 : i+1;
            self.fetchParkingData(i);
            self.fetchPassDataPush();
        }, 5000);
        self.fetchWeatherData();
        self.fetchPM25();
        self.fetchPassData();
    }
    fetchParkingData(index) {
        let self = this;
        this.parking.inUsePrev = this.parking.inUse;
        this.parking.allPrev = this.parking.all;
        axios.get('http://192.168.1.16:300/parkingLot' + index).then(function(data){
            self.parking.inUse = data.data.inUse;
            self.parking.all = data.data.all;
        })
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
            fetchJsonp(url, {
                jsonpCallback: 'custom_callback',
                jsonpCallbackFunction: 'data' + time
            }).then(function (data) {
                return data.json();
            }).then(function (json) {
                if(time === 'yesterday') {
                    self.weather[time] = getTemp(json.result);
                    findMin(self.weather[time].low);
                } else if (time === 'today') {
                    self.weather[time] = { 'high': json.result.temp_high , 'low': json.result.temp_low, 'day': json.result.days}
                    findMin(self.weather[time].low);
                } else if (time === 'future') {
                    self.weather[time] = json.result.map(function(item){
                        findMin(item.temp_low);
                        return { 'high': item.temp_high, 'low': item.temp_low, 'day': item.days }
                    })
                }
            });
        }
        function findMin(compare) {
            self.weather['min'] = compare < self.weather['min'] ? compare : self.weather['min']
        }
        for (let i in urlObj) fetchWeather(urlObj[i], i);
    }
    fetchPassData() {
        let self = this;
        for (let i = 0; i < 20; i++) {
            let date = new Date(self.pass.dottedBase += 3600 * 24 * 1000);
            self.pass.category.push([
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            ].join('-'));
            let b = Math.random() * 200;
            let d = Math.random() * 200;
            self.pass.barData.push(b)
            self.pass.lineData.push(d + b);
        }
    }
    fetchPassDataPush() {
        let self = this;
        let date = new Date(self.pass.dottedBase += 3600 * 24 * 1000);
        self.pass.category.push([
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-'));
        self.pass.category.shift();
        let b = Math.random() * 200;
        let d = Math.random() * 200;
        self.pass.barData.push(b);
        self.pass.barData.shift();
        self.pass.lineData.push(d + b);
        self.pass.lineData.shift();
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
        })
    }
}

export default EchartsData;