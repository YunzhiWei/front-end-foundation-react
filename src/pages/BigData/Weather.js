import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import './css/weather.css'

@inject("echartsData") @observer
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
        const { echartsData } = this.props;
        var today = "icon_sunny";
        return (
            <div id="weather">
                <p className="day"><span>{this.state.year} 年 {this.state.month} 月 {this.state.day} 日</span><span>星期{"日一二三四五六".charAt(new Date().getDay())}</span></p>
                <div className="weather_panel">
                    <span>
                        <div>
                            <i className={`icon_weather ${echartsData.weather.today.icon}`}></i>
                            <p className="realtime"><span className="text-big">{echartsData.weather.today.temp_curr}</span>（实时）</p>
                            <p className="temp">{echartsData.weather.today.temp}</p>
                            <p className="weather">{echartsData.weather.today.weather}</p>
                            <p className="windy">{echartsData.weather.today.wind}</p>
                        </div>
                    </span>
                    {echartsData.weather.future.map((item, i) => {
                        if (i > 5 || i === 0) return;
                        return (
                            <span key={1+i}>
                                <div>
                                    <p className="week">{item.date}</p>
                                    <p className="month_day">{item.day}</p>
                                    <i className={`icon_weather ${item.icon}`}></i>
                                    <p className="temp">{item.temp}</p>
                                    <p className="weather">{item.weather}</p>
                                    <p className="windy">{item.wind}</p>
                                    <div className="span_split"></div>
                                </div>
                            </span>
                        )
                    })}
                    
                </div>
            </div>
        )
    }
}

export default WeatherComponent;

