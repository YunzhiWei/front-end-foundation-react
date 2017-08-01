import React,{ Component } from 'react';
import ReactEcharts from './lib';
import echartsOption from '../function/function';

class DynamicChartComponent extends Component {
    render() {
        const option = echartsOption(this.props, 'DynamicChart');
        return (
            <div className='examples'>
                <div className='parent' style={{position: 'relative'}}>
                    <ReactEcharts ref='echarts_react'
                        option={option}
                        style={{height: 400,width: 850,margin: '0 0 0 -50%',left: '50%'}} />
                </div>
            </div>
        );
    }
};

export default DynamicChartComponent;
