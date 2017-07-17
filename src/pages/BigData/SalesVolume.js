import React, { Component } from "react";
import ReactEcharts from './lib';

require("echarts/map/js/province/jiangxi.js");
require("echarts/map/js/province/jiangsu.js");
require("echarts/map/js/province/zhejiang.js");

class SalesVolume extends Component {
  render() {
    const {geoMapName, visualMin, visualMax, visualLabel, seriesData} = this.props;
    // console.log("min max:", visualMin, visualMax);

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
      // 单个市hover产生的悬浮框
      tooltip: { trigger: 'item' },
      // 左侧年份选项
      legend: {
        top: 'top',
        orient: 'horizontal',
        textStyle: { color: '#FF' },
        data: legendData,
      },
      // 图例度量尺
      visualMap: {
        min: visualMin,
        max: visualMax,
        right: 'right',
        top: 'bottom',
        text: visualLabel,
        calculable: true,
        textStyle: { color: '#BFDAED' },
      },
      // 匹配地图属性
      geo: {
        type: 'map',
        map: geoMapName,
        itemStyle: {
          normal: { color: '#323C47' }
        }
      },
      // 给地图上的属性和数据赋值
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
