import React,{ Component } from 'react';
import './css/weather.css'

class WeatherComponent extends Component {
    constructor() {
        super()
        this.state = {
            year: '1970',
            month: '01',
            day: '01'
        }
    }
    componentWillMount() {
        var self = this;
        function addTime(arg) { return arg < 10 ? '0'+arg : arg }
        function step() {
            var date = new Date();
            self.setState({
                year: date.getFullYear(),
                month: date.getMonth()+1,
                day: date.getDate()
            })
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    render() {
        var today = 'icon_sunny';
        var day1 = 'icon_cloudy';
        var day2 = 'icon_overvast';
        var day3 = 'icon_fog';
        var day4 = 'icon_lightrain';
        var day5 = 'icon_shower';
        return (
            <div id="weather">
                <p className="day"><span>{this.state.year} 年 {this.state.month} 月 {this.state.day} 日</span><span>星期{"日一二三四五六".charAt(new Date().getDay())}</span></p>
                <div className="weather_panel">
                    <span>
                        <div>
                            <i className={`icon_weather ${today}`}></i>
                            <p className="realtime"><span className="text-big">25℃</span>（实时）</p>
                            <p className="temp">22 - 27℃</p>
                            <p className="weather">小雨转多云</p>
                            <p className="windy">西北风3-4级</p>
                        </div>
                    </span>
                    <span>
                        <div>
                            <p className="week">周六</p>
                            <p className="month_day">09月16日</p>
                            <i className={`icon_weather ${day1}`}></i>
                            <p className="temp">22 - 27℃</p>
                            <p className="weather">多云</p>
                            <p className="windy">西北风3-4级</p>
                            <div className="span_split"></div>
                        </div>
                    </span>
                    <span>
                        <div>
                            <p className="week">周日</p>
                            <p className="month_day">09月16日</p>
                            <i className={`icon_weather ${day2}`}></i>
                            <p className="temp">22 - 27℃</p>
                            <p className="weather">多云</p>
                            <p className="windy">西北风3-4级</p>
                            <div className="span_split"></div>
                        </div>
                    </span>
                    <span>
                        <div>
                            <p className="week">周一</p>
                            <p className="month_day">09月16日</p>
                            <i className={`icon_weather ${day3}`}></i>
                            <p className="temp">22 - 27℃</p>
                            <p className="weather">多云</p>
                            <p className="windy">西北风3-4级</p>
                            <div className="span_split"></div>
                    </div>
                    </span>
                    <span>
                        <div>
                            <p className="week">周二</p>
                            <p className="month_day">09月16日</p>
                            <i className={`icon_weather ${day4}`}></i>
                            <p className="temp">22 - 27℃</p>
                            <p className="weather">多云</p>
                            <p className="windy">西北风3-4级</p>
                            <div className="span_split"></div>
                        </div>
                    </span>
                    <span>
                        <div>
                            <p className="week">周三</p>
                            <p className="month_day">09月16日</p>
                            <i className={`icon_weather ${day5}`}></i>
                            <p className="temp">22 - 27℃</p>
                            <p className="weather">多云</p>
                            <p className="windy">西北风3-4级</p>
                            <div className="span_split"></div>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default WeatherComponent;

