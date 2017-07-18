import React, { Component } from "react";
import ReactEcharts from './lib';

require("echarts/map/js/province/jiangxi.js");
require("echarts/map/js/province/jiangsu.js");
require("echarts/map/js/province/zhejiang.js");

class SalesVolume extends Component {
  render() {
    const {geoMapName, visualMin, visualMax, visualLabel, seriesData} = this.props;

    const legendData = seriesData.map((item) => {
      return item.name;
    });

    seriesData.forEach((item) => {
      item.type = "map";
      item.mapType = geoMapName,
      item.label = {
        normal: {
          show: true,
          textStyle: { color: '#0', }
        }
      };
    });

    const option = {
      backgroundColor: '#122E41',
      tooltip: { trigger: 'item' },
      legend: {
        top: 'top',
        orient: 'horizontal',
        textStyle: { color: '#FF' },
        data: legendData,
      },
      visualMap: {
        min: visualMin,
        max: visualMax,
        right: 'right',
        top: 'bottom',
        text: visualLabel,
        calculable: true,
        textStyle: { color: '#BFDAED' },
      },
      geo: {
        type: 'map',
        map: geoMapName,
        itemStyle: {
          normal: { color: '#323C47' }
        }
      },
      series: seriesData
    };

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
