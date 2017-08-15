import React, { Component } from 'react';
import ReactEcharts from './lib';
import echarts from 'echarts';

var convertedData = [];
var geoCoordMap = {};

function convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

function renderBrushed(params) {
    var mainSeries = params.batch[0].selected[0];
    var selectedItems = [];
    var categoryData = [];
    var barData = [];
    var maxBar = 20;
    var sum = 0;
    var count = 0;

    for (let i = 0; i < mainSeries.dataIndex.length; i++) {
        var rawIndex = mainSeries.dataIndex[i];
        var dataItem = convertedData[0][rawIndex];
        var pmValue = dataItem.value[2];

        sum += pmValue;
        count++;

        selectedItems.push(dataItem);
    }

    selectedItems.sort(function (a, b) {
        return a.value[2] - b.value[2];
    });

    for (let i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
        categoryData.push(selectedItems[i].name);
        barData.push(selectedItems[i].value[2]);
    }

    this.setOption({
        yAxis: {
        	name: '最多只显示前 '+maxBar+' 名：',
            data: categoryData
        },
        xAxis: {
            axisLabel: {show: !!count}
        },
        title: {
            id: 'statistic',
            text: count ? '平均: ' + (sum / count).toFixed(4) : '',
            textStyle: {
            	color: '#ddb926'
            }
        },
        series: {
            id: 'bar',
            data: barData
        }
    });
}

class CoverageArea extends Component{

	componentDidMount() {
		var myChart = echarts.init(document.getElementsByClassName('CoverageArea')[0]);
		myChart.on('brushselected', renderBrushed);

	    myChart.dispatchAction({
	        type: 'brush',
	        areas: [
	            {
	                geoIndex: 0,
	                brushType: 'polygon',
	                coordRange: [[119.68,34.85],[117.43,33.8],[118.44,29.42],[120.89,27.61],[123.36,30.55],[121.64,34.08]]
	            }
	        ]
	    });
	}

	render() {
        const option = {
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            brush: {
                outOfBrush: {
                    color: '#abc'
                },
                brushStyle: {
                    borderWidth: 2,
                    color: 'rgba(0,0,0,0.2)',
                    borderColor: 'rgba(0,0,0,0.5)',
                },
                seriesIndex: [0, 1],
                throttleType: 'debounce',
                throttleDelay: 300,
                geoIndex: 0
            },
            geo: {
                map: 'china',
                left: '10',
                right: '35%',
                center: [115.89,28.68],
                zoom: 2.5,
                label: {
                    emphasis: {
                        show: true
                    }
                },
                roam: true,
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
            tooltip : {
                trigger: 'item'
            },
            grid: {
                left: '60%',
                top: 100,
                bottom: 40,
                width: '35%'
            },
            xAxis: {
                type: 'value',
                scale: true,
                position: 'top',
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {margin: 2, textStyle: {color: '#aaa'}},
            },
            yAxis: {
                type: 'category',
                nameGap: 26,
                nameTextStyle: {
                    fontSize: 14,
                    fontStyle: 'italic',
                    fontWeight: 100
                },
                axisLine: {show: false, lineStyle: {color: '#ddd'}},
                axisTick: {show: false, lineStyle: {color: '#ddd'}},
                axisLabel: {interval: 0, textStyle: {color: '#ddd'}},
                data: []
            },
            series : [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertedData[0],
                    symbolSize: function (val) {
                        return Math.max(val[2] / 10, 8);
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertedData[1],
                    symbolSize: function (val) {
                        return Math.max(val[2] / 10, 8);
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    id: 'bar',
                    zlevel: 2,
                    type: 'bar',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    },
                    data: []
                }
            ]
        };

        const coverageAreaData = this.props.coverageAreaData;
        geoCoordMap = this.props.geoCoordMap;
        convertedData = [
            convertData(coverageAreaData),
            convertData(coverageAreaData.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];
        option.series[0].data = convertedData[0];
        option.series[1].data = convertedData[1];

		return (
		  	<ReactEcharts
              option={option}
              style={{width: '100%',height: '100%'}}
              className='react_for_echarts'
            />
		);
	}
}

export default CoverageArea;