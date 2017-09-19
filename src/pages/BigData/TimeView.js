import React,{ Component } from 'react';

class TimeViewComponent extends Component {
	constructor() {
		super()
		this.state = {
			year: '2017',
			month: '09',
			day: '19',
			hour: '16',
			minute: '10',
			second: '55'
		}
	}
	componentWillMount() {
		var self = this;
		setInterval(function () {
			var date = new Date();
			self.setState({
				year: date.getFullYear(),
				month: date.getMonth()+1,
				day: date.getDate(),
				hour: date.getHours(),
				minute: date.getMinutes(),
				second: date.getSeconds()
			})
		}, 1000)
		var data = [{name:"a",age:1,phone:12423423},{name:"a",age:1,phone:12423423}]
		var params = {
			stops: data
		}
		params = JSON.stringify(params);
		localStorage.setItem("params", params)
	}
	render() {
		var obj = JSON.parse(localStorage.getItem("params"))
		console.log(obj);
		localStorage.removeItem("params");
		console.log(JSON.parse(localStorage.getItem("params")));
		return (
		    <div className="time_view">
		    	`${this.state.year} 年 ${this.state.month} 月 ${this.state.day} 日 ${this.state.hour} : ${this.state.minute} : ${this.state.second}`
		    </div>
		);
	}
}

export default TimeViewComponent;