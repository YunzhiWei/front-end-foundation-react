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
		const parking = this.props.echartsData.parking;
		const option = echartsOption(parking, 'TicketBusiness');
		const setting1 = setting(parking.inUsePrev, parking.inUse);
		const setting2 = setting(parking.allPrev, parking.all);
		const setting3 = setting(0, 1200);
		return (
			<div style={{height: '100%', width: '100%'}}>
				<div className="tickets_num">
				    <p><span>线上售票：</span><span><b><CountUp className="account-balance" {...setting1} /></b></span><span>张</span></p>
				    <p><span>线下售票：</span><span><b><CountUp className="account-balance" {...setting2} /></b></span><span>张</span></p>
				    <p><span>今日检票：</span><span><b><CountUp className="account-balance" {...setting3} /></b></span><span>张</span></p>
				</div>
			    <ReactEcharts
			      option={option}
			      style={{width: '45%',height: '100%', display: 'inline-block'}}
			      className='TicketBusiness'
			    />
		    </div>
		);
	}
}

export default TicketBusinessComponent;