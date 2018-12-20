import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from "../function/boatFunc";

@inject("boatScheduleData") @observer
class BoatsListComponent extends Component {
    render() {
        const { _boatsList, _boatUsageAmount } = this.props.boatScheduleData;
        const option = echartsOption({ _boatsList, _boatUsageAmount }, 'BoatsList');
		return (
            <ReactEcharts 
                option={option}
                style={{width: '100%',height: '100%'}}
                className='FortyBoats'
            />
        );
	}
}

export default BoatsListComponent;