import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

import "echarts/map/js/province/jiangxi.js";

@inject("bigDataAnlsData") @observer
class AnlsProvMapComponent extends Component {
    render() {
        const option = echartsOption(this.props.bigDataAnlsData, 'AnlsProvMap');    
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%',height: '100%'}}
                className='AnlsProvMap'
            />
        );
    }
}

export default AnlsProvMapComponent;