import React,{ Component } from 'react';
import './css/weather.css'

class WeatherComponent extends Component {
    render() {
        return (
            <div id="weather">
                <p className="day"><span>2017年09月15日</span><span>周五</span></p>
                <div className="weather_panel">
                    <span>
                        <div>
                            <i className="icon_weather icon_sunny"></i>
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
                            <i className="icon_weather icon_cloudy"></i>
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
                            <i className="icon_weather icon_shower"></i>
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
                            <i className="icon_weather icon_lightrain"></i>
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
                            <i className="icon_weather icon_thundershower"></i>
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
                            <i className="icon_weather icon_lightsnow"></i>
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

