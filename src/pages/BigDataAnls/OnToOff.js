import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("echartsData") @observer
class OnToOffComponent extends Component {
    render() {
        const { ticketsNum } = this.props.echartsData;
        const option = echartsOption(ticketsNum, 'OnToOff');   
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%',height: '100%'}}
                className='OnToOff'
            />
        );
    }
}

export default OnToOffComponent;