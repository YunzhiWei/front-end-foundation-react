import React, { Component } from "react";
import ReactEcharts from './lib';

require("echarts/map/js/china.js");

const option = {
    backgroundColor: '#122E41',
    legend: {
        left: 'left',
        data: ['强', '中', '弱'],
        textStyle: {
            color: '#ccc'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [{
        name: '弱',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 1,
        large: true,
        itemStyle: {
            normal: {
                shadowBlur: 2,
                shadowColor: 'rgba(37, 140, 249, 0.8)',
                color: 'rgba(37, 140, 249, 0.8)'
            }
        },
        data: []
    }, {
        name: '中',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 1,
        large: true,
        itemStyle: {
            normal: {
                shadowBlur: 2,
                shadowColor: 'rgba(14, 241, 242, 0.8)',
                color: 'rgba(14, 241, 242, 0.8)'
            }
        },
        data: []
    }, {
        name: '强',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 1,
        large: true,
        itemStyle: {
            normal: {
                shadowBlur: 2,
                shadowColor: 'rgba(255, 255, 255, 0.8)',
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        data: []
    }]
};

class WeiboData extends Component {
	render() {
        const weiboData = this.props.weiboData;
		weiboData.map(function (serieData, idx) {
		    console.log(serieData[0])
		    console.log(serieData[1])
		    var px = serieData[0] / 1000;
		    var py = serieData[1] / 1000;
		    var res = [[px, py]];

		    for (var i = 2; i < serieData.length; i += 2) {
		        var dx = serieData[i] / 1000;
		        var dy = serieData[i + 1] / 1000;
		        var x = px + dx;
		        var y = py + dy;
		        res.push([x.toFixed(2), y.toFixed(2), 1]);

		        px = x;
		        py = y;
		    }
		    option.series[idx].data = res;
		    return res;
		});
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
		)
	}
}

export default WeiboData;