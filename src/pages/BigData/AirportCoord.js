import React, { Component } from 'react';
import ReactEcharts from '../lib';
import echartsOption from '../function/function';

require('./data/mapLib').airportCoordMap.map((item)=>{ console.log(item); return require("echarts/map/js/"+(item === 'china' ? 'china' : 'province/'+item)+".js") })

class AirportCoordComponent extends Component{
    render() {
        const option = echartsOption(this.props.FromToLinesData, 'AirportCoordComponent');
        return (
            <ReactEcharts
              option={option}
              style={{width: '100%', height: '100%'}} 
              className='react_for_echarts'
            />
        );
    }
};

export default AirportCoordComponent;
