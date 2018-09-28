import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react'
import echartsOption from '../function/function';

@inject("echartsData") @observer
class ResUtilizationComponent extends Component {
	render() {
		const { echartsData } = this.props;
		const option = echartsOption(echartsData.pass, 'ResUtilization');
		return (
			<div style={{height: '336px', margin: '12px 0'}}>
			    <ReactEcharts
			      option={option}
			      style={{width: '100%',height: '100%'}}
			      className='ResUtilization'
			    />
		    </div>
		);
	}
}

export default ResUtilizationComponent;