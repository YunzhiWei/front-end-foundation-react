import React,{ Component } from 'react';

class TimeViewComponent extends Component {
	constructor() {
		super()
		this.state = {
			year: '1970',
			month: '01',
			day: '01',
			hour: '00',
			minute: '00',
			second: '00'
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
		    	day: date.getDate(),
		    	hour: addTime(date.getHours()),
		    	minute: addTime(date.getMinutes()),
		    	second: addTime(date.getSeconds())
		    })
		    self.myReq = requestAnimationFrame(step);
		}
		self.myReq = requestAnimationFrame(step);
	}
	componentWillUnmount() {
	    cancelAnimationFrame(this.myReq)
	}
	render() {
		return (
		    <div className="time_view">
		    	<p className="yymmdd">{this.state.year} 年 {this.state.month} 月 {this.state.day} 日</p>
		    	<p className="week"> 星期{"日一二三四五六".charAt(new Date().getDay())}</p>
		    	<p className="hhmmss"><span>{this.state.hour}</span><span className="split"> : </span><span>{this.state.minute}</span><span className="split"> : </span><span>{this.state.second}</span></p>
		    </div>
		);
	}
}

export default TimeViewComponent;