import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import CountUp from 'react-countup';

import ReactEcharts from './lib';
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
class ParkingLotComponent extends Component {
	render() {
		const { echartsData } = this.props;
		const option = echartsOption(echartsData.parking, 'ParkingLot');
		const setting1 = setting(0, 432);
		const setting2 = setting(0, 768);
		const setting3 = setting(0, 1200);
		return (
			<div style={{height: '100%', width: '100%'}}>
			    <ReactEcharts
					option={option}
					style={{width: '60%',height: '100%', display: 'inline-block'}}
					className='ParkingLot'
			    />
			    <div className="parking_num">
			        <p><span>可用车位：</span><span><b><CountUp className="account-balance" {...setting1} /></b></span><span>个</span></p>
			        <p><span>已用车位：</span><span><b><CountUp className="account-balance" {...setting2} /></b></span><span>个</span></p>
			        <p><span>车位总数：</span><span><b><CountUp className="account-balance" {...setting3} /></b></span><span>个</span></p>
			        <hr/>
			        <p><span>可调船数：</span><span><b><CountUp className="account-balance" {...setting1} /></b></span><span>艘</span></p>
			        <p><span>已调船数：</span><span><b><CountUp className="account-balance" {...setting2} /></b></span><span>艘</span></p>
			        <p><span>总船数：</span><span><b><CountUp className="account-balance" {...setting3} /></b></span><span>艘</span></p>
			    </div>
			</div>
		);
	}
}

export default ParkingLotComponent;