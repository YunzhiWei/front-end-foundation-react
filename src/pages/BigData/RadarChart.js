import React, { Component } from 'react';
import ReactEcharts from '../lib';
import echartsOption from '../function/function';

class RadarChart extends Component {
    render() {
        const option = echartsOption(this.props.radarData, 'RadarChart');
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
