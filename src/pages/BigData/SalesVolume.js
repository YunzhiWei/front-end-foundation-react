import React, { Component } from "react";
import ReactEcharts from './lib';
import echartsOption from "../function/function";

require("echarts/map/js/province/jiangxi.js");
require("echarts/map/js/province/jiangsu.js");
require("echarts/map/js/province/zhejiang.js");

class SalesVolume extends Component {
  render() {    
    const option = echartsOption(this.props.BlockAreaData)
    return (
      <div className='examples'>
        <div className='parent' style={{position: 'relative'}}>
          <ReactEcharts
            option={option}
            style={{width: '400px',height: '400px',margin: '0 0 0 -50%',left: '50%'}}
            className='react_for_echarts'
          />
        </div>
      </div>
    );
  }
}

export default SalesVolume;
