import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

import "echarts/map/js/province/jiangxi.js";

@inject("bigDataAnlsData") @observer
class AnlsProvMapComponent extends Component {
    render() {
        const { _JXRanking } = this.props.bigDataAnlsData
        const option = echartsOption(_JXRanking[0], 'AnlsProvMap');    
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