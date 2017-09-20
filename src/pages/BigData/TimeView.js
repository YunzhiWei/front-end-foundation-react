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
		function addTime(arg) { return arg < 10 ? '0'+arg : arg }
		setInterval(function () {
			var date = new Date();
			self.setState({
				year: date.getFullYear(),
				month: date.getMonth()+1,
				day: date.getDate(),
				hour: addTime(date.getHours()),
				minute: addTime(date.getMinutes()),
				second: addTime(date.getSeconds())
			})
		}, 300)
	}
	render() {
		return (
		    <div className="time_view">
		    	<p className="yymmdd">{this.state.year} 年 {this.state.month} 月 {this.state.day} 日 星期三</p>
		    	<p className="hhmmss"><span>{this.state.hour}</span> : <span>{this.state.minute}</span> : <span>{this.state.second}</span></p>
		    </div>
		);
	}
}

export default TimeViewComponent;