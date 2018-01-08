import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import CountUp from 'react-countup';

import ReactEcharts from '../lib';
import echartsOption from '../function/function';

import { inject, observer } from 'mobx-react'

function setting(start, end) {
	var setTemp = new Object();
	setTemp.start = start;
	setTemp.end = end;
	setTemp.duration = 2;
	setTemp.useEasing = true;
	setTemp.useGrouping = true;
	setTemp.separator = ",";
	return setTemp;
}

@inject("echartsData") @observer
class TicketBusinessComponent extends Component {
	render() {
		const ticketsNum = this.props.echartsData.ticketsNum;
		const option = echartsOption(ticketsNum, 'TicketBusiness');
		const setting1 = setting(ticketsNum.prevOnline, ticketsNum.online);
		const setting2 = setting(ticketsNum.prevOffline, ticketsNum.offline);
		const setting3 = setting(ticketsNum.prevCheck, ticketsNum.check);
		return (
			<div style={{height: '100%', width: '100%'}}>
				<div className="tickets_num">
				    <p><span>线上售票：</span><span><b><CountUp className="account-balance" {...setting1} /></b></span><span>张</span></p>
				    <p><span>线下售票：</span><span><b><CountUp className="account-balance" {...setting2} /></b></span><span>张</span></p>
				    <p><span>今日检票：</span><span><b><CountUp className="account-balance" {...setting3} /></b></span><span>张</span></p>
				</div>
			    <ReactEcharts
			      option={option}
			      style={{width: '50%',height: '100%', display: 'inline-block'}}
			      className='TicketBusiness'
			    />
		    </div>
		);
	}
}

export default TicketBusinessComponent;