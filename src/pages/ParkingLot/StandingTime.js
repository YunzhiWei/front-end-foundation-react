import React, { Component } from "react";
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from "../function/parkingFunc";

@inject("parkingLotData") @observer
class StandingTimeComponent extends Component {
    render() {
        const option = echartsOption(this.props.parkingLotData._standingTime, 'StandingTime');        
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%',height: '100%'}}
                className='StandingTime'
            />
        );
    }
}

export default StandingTimeComponent;