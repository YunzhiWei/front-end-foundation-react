import React, { Component } from 'react';
import ReactEcharts from './lib';

require('./data/mapLib').airportCoordMap.map((item)=>{ return require("echarts/map/js/"+(item === 'china' ? 'china' : 'province/'+item)+".js") })

var geoCoordMap = {};

function convertName2Coor(dataItem) {
  const toCoord = geoCoordMap[dataItem.to];
  const fromCoord = geoCoordMap[dataItem.from];
  if (fromCoord && toCoord) {
    return(
      {
        fromName: dataItem.from,
        toName: dataItem.to,
        coords: [fromCoord, toCoord]
      }
    );
  }
  else return ({});
};
function convertSourceName2Marker(dataItem) {
  return {
    name: dataItem.from,
    value: geoCoordMap[dataItem.from].concat([dataItem.value])
  };
};
function convertTargetName2Marker(dataItem) {
  return {
    name: dataItem.to,
    value: geoCoordMap[dataItem.to].concat([dataItem.value])
  };
};

class AirportCoord extends Component{
    render() {
      const {geoMapName, directionOut, fromtoLines, iconPath} = this.props.FromToLinesData;
      geoCoordMap = this.props.geoCoordMap;

      const series = [];
      fromtoLines.forEach((item, i) => {
        const staticlines = {
          name: item.legendName,
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 1
          },
          lineStyle: {
            normal: {
              color: item.color,
              width: 0,
              curveness: 0.2
            }
          },
          data: item.data.map(convertName2Coor)
        };
        const dynamiclines = {
          name: item.legendName,
          type: 'lines',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 3,
          lineStyle: {
              normal: {
                  color: item.color,
                  width: 1,
                  opacity: 0.6,
                  curveness: 0.2
              },
              emphasis: {
                  color: item.color,
                  width: 3,
                  opacity: 0.6,
                  curveness: 0.2
              }
          },
          data: item.data.map(convertName2Coor)
        };
        if((iconPath !== undefined) && (iconPath !== null)) {
          dynamiclines.effect = {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: iconPath,
            symbolSize: 15
          };
        }
        const markers = {
          name: item.legendName,
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: { brushType: 'stroke' },
          label: {
            normal: {
              show: true,
              position: 'right',
              // formatter: '{b}'
              formatter: function(item) {
                  return item.name + '：' + item.value[2]
              }
            }
          },
          symbolSize: function(val) {
            return val[2] / 8;
          },
          itemStyle: { normal: { color: item.color } },
          data: item.data.map(directionOut? convertTargetName2Marker : convertSourceName2Marker)
        };
        series.push(staticlines, dynamiclines, markers);
      });

      const option = {
        backgroundColor: '#122E41',
        tooltip: { trigger: 'item' },
        legend: {
          orient: 'vertical',
          top: 'bottom',
          left: 'right',
          data: fromtoLines.map((item) => { return item.legendName; }),
          textStyle: { color: '#fff' },
          // selectedMode: 'single'
        },
        geo: {
          roam: true,           // zoom in & zoom out
          map: geoMapName,
          label: { emphasis: { show: false } },
          itemStyle: {
            normal: { areaColor: '#323c48', borderColor: '#122E41' },
            emphasis: { areaColor: '#2a333d' }
          }
        },
        series: series
      };

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

export default AirportCoord;
