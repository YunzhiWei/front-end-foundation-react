import React, { Component } from "react";
import ReactEcharts from './lib';
import echartsOption from "../function/function";

require('./data/mapLib').blockAreaMap.map((item)=>{ return require("echarts/map/js/"+(item === 'china' ? 'china' : 'province/'+item)+".js") })

class SalesVolume extends Component {
    render() {
        const option = echartsOption(this.props.BlockAreaData, 'SalesVolume');
        return (
            <ReactEcharts
                option={option}
                style={{width: '400px',height: '400px',margin: '0 0 0 -50%',left: '50%'}}
                className='react_for_echarts' />
        );
    }
}

export default SalesVolume;
