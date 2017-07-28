import React, { Component } from 'react';
import ReactEcharts from './lib';
import geoCoordMap from './data/geoCoordMap';
import echartsOption from '../function/function';

require("echarts/map/js/china.js");
require("echarts/map/js/province/jiangxi.js");



class AirportCoordComponent extends Component{
    render() {
      const option = echartsOption(this.props.FromToLinesData);

      return (
        <div className='examples'>
          <div className='parent' style={{position: 'relative'}}>
            <ReactEcharts
              option={option}
              style={{width: '500px',height: '400px',margin: '0 0 0 -50%',left: '50%'}}
              className='react_for_echarts'
            />
          </div>
        </div>
      );
    }
};

export default AirportCoordComponent;
