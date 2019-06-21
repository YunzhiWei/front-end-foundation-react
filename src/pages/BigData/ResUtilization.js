import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react'
import echartsOption from '../function/function';

@inject("bigDataAnlsData") @observer
class ResUtilizationComponent extends Component {
	render() {
		const { _nationalRanking } = this.props.bigDataAnlsData;
		const option = echartsOption(_nationalRanking[0], 'ResUtilization');
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