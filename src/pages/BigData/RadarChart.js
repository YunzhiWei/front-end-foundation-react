import React, { Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react'
import echartsOption from '../function/function';

@inject("echartsData") @observer
class RadarChart extends Component {
    render() {
        const { occupantDensity } = this.props.echartsData;
        const option = echartsOption(occupantDensity, 'RadarChart');
        return (
            <ReactEcharts
              option={option}
              style={{width: '100%',height: '100%'}}
              className='RadarChart'
            />
        );
    }
};

export default RadarChart;
