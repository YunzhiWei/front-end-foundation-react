import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from "../function/boatFunc";

@inject("boatScheduleData") @observer
class FortyBoatsComponent extends Component {
    render() {
        const option = echartsOption(this.props.boatScheduleData._fortyBoats, 'FortyBoats');
		return (
            <ReactEcharts 
                option={option}
                style={{width: '100%',height: '100%'}}
                className='FortyBoats'
            />
        );
	}
}

export default FortyBoatsComponent;