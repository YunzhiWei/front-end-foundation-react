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
class ParkingLotComponent extends Component {
	render() {
		const { echartsData } = this.props;
		const option = echartsOption(echartsData.parking, 'ParkingLot');
		const setting1 = setting(0, 432);
		const setting2 = setting(0, 20);
		const setting3 = setting(0, 32);
		const setting4 = setting(0, 26);
		const setting5 = setting(0, 6);
		const setting6 = setting(0, 4);
		return (
			<div style={{height: '100%', width: '100%'}}>
			    <ReactEcharts
					option={option}
					style={{width: '60%',height: '100%',float: "left", display: 'inline-block'}}
					className='ParkingLot'
			    />
			    <div className="parking_num">
			        <p><span>可用车位：</span><span><b><CountUp className="account-balance" {...setting1} /></b></span><span>辆</span></p>
			        <p><span>实时出场：</span><span><b><CountUp className="account-balance" {...setting2} /></b></span><span>辆</span></p>
			        <p><span>实时入场：</span><span><b><CountUp className="account-balance" {...setting3} /></b></span><span>辆</span></p>
			        <hr/>
			        <p><span>可调船数：</span><span><b><CountUp className="account-balance" {...setting4} /></b></span><span>艘</span></p>
			        <p><span>实时离港：</span><span><b><CountUp className="account-balance" {...setting5} /></b></span><span>艘</span></p>
			        <p><span>实时到港：</span><span><b><CountUp className="account-balance" {...setting6} /></b></span><span>艘</span></p>
			    </div>
			</div>
		);
	}
}

export default ParkingLotComponent;