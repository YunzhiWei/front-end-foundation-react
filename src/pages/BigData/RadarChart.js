import React, { Component } from 'react';
import ReactEcharts from './lib';
import echartsOption from '../function/function';

class RadarChart extends Component {
    render() {
        const option = echartsOption(this.props.radarData, 'RadarChart');
        return (
            <div className='examples'>
                <div className='parent' style={{position: 'relative'}}>
                    <ReactEcharts
                        option={option}
                        style={{height: 400,width: 400,margin: '0 0 0 -50%',left: '50%'}} />
                </div>
            </div>
        );
    }
};

export default RadarChart;
