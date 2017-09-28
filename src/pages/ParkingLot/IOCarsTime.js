import React, { Component } from "react";
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from "../function/parkingFunc";

@inject("parkingLotData") @observer
class IOCarsTimeComponent extends Component {
    render() {
        const option = echartsOption(this.props.parkingLotData._IOCarsTime, 'IOCarsTime');
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%',height: '100%'}}
                className='IOCarsTime'
            />
        );
    }
}

export default IOCarsTimeComponent;