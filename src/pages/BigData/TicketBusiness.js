import React,{ Component } from 'react';
import ReactEcharts from './lib';
import { inject, observer } from 'mobx-react'
import echartsOption from '../function/function';

@inject("echartsData") @observer
class TicketBusinessComponent extends Component {
	render() {
		const { echartsData } = this.props;
		const option = echartsOption(echartsData.parking, 'TicketBusiness');
		return (
		    <ReactEcharts
		      option={option}
		      style={{width: '70%',height: '100%', display: 'inline-block'}}
		      className='TicketBusiness'
		    />
		);
	}
}

export default TicketBusinessComponent;