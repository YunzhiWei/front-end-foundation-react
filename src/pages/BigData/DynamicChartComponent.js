import React,{ Component } from 'react';
import ReactEcharts from './lib';
import echartsOption from '../function/function';

class DynamicChartComponent extends Component {
    render() {
        const option = echartsOption(this.props.dynamicChart, 'DynamicChart');
        return (
            <ReactEcharts
              option={option}
              style={{width: '100%',height: '100%'}}
              className='DynamicChart'
            />
        );
    }
};

export default DynamicChartComponent;
