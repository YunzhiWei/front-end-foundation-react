import React, { Component } from "react";
import ReactEcharts from './lib';

require('./data/mapLib').blockAreaMap.map((item)=>{ return require("echarts/map/js/"+(item === 'china' ? 'china' : 'province/'+item)+".js") })

class SalesVolume extends Component {
  render() {
    const {geoMapName, visualMin, visualMax, visualLabel, mapDataSeries} = this.props.BlockAreaData;
    const legendData = mapDataSeries.map((item) => {
      return item.name;
    });

    mapDataSeries.forEach((item) => {
      item.type = "map";
      item.mapType = geoMapName;
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
      series: mapDataSeries
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
