import geoCoordMap from '../BigData/data/geoCoordMap';

// 原SalesVolume
function blockArea(arg) {
    const {geoMapName, visualMin, visualMax, visualLabel, mapDataSeries} = arg;
    mapDataSeries.forEach((item) => {
        item.type = "map";
        item.mapType = geoMapName;
        item.label = {
            normal: {
                show: true,
                textStyle: {
                    color: '#0',
                }
            }
        };
    });
    const legendData = mapDataSeries.map((item) => { return item.name });
    const option = {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'item' },
        legend: { 
            orient: 'horizontal',
            top: 'top',
            textStyle: { color: '#f' },
        },
        visualMap: {
            right: 'right',
            top: 'bottom',
            calculable: true,
            textStyle: { color: '#BFDAED' },
        },
        geo: { 
            roam: false,
            type: 'map',
            map: '',
            itemStyle: { 
                normal: { color: '#48d8fd', borderColor: '#122E41' },
                emphasis: { areaColor: '#2a333d' }
            }
        },
        color: ['#48d8fd', '#ff0', '#27f'],
        series: mapDataSeries
    }
    option.legend.data = legendData;
    option.visualMap.min = visualMin;
    option.visualMap.max = visualMax;
    option.visualMap.text = visualLabel;
    option.geo.map = geoMapName;
    return option;
}

// 飞机线
function airportCoord(arg) {
    const {geoMapName, directionOut, fromtoLines, iconPath} = arg;
    function convertName2Coor(dataItem) {
        const toCoord = geoCoordMap[dataItem.to];
        const fromCoord = geoCoordMap[dataItem.from];
        if (fromCoord && toCoord) {
            return ({
                fromName: dataItem.from,
                toName: dataItem.to,
                coords: [fromCoord, toCoord]
            });
        } else return ({});
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
        if ((iconPath !== undefined) && (iconPath !== null)) {
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
            rippleEffect: {
                brushType: 'stroke'
            },
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
            itemStyle: {
                normal: {
                    color: item.color
                }
            },
            data: item.data.map(directionOut ? convertTargetName2Marker : convertSourceName2Marker)
        };
        series.push(staticlines, dynamiclines, markers);
    });
    const option = {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'item' },
        legend: { 
            orient: 'horizontal',
            top: 'top',
            textStyle: { color: '#f' },
        },
        geo: { 
            roam: false,
            type: 'map',
            map: '',
            itemStyle: { 
                normal: { color: '#323c47', borderColor: '#122E41' },
                emphasis: { areaColor: '#2a333d' }
            }
        },
        series
    }
    option.legend.data = fromtoLines.map((item) => { return item.legendName; });
    option.geo.roam = true;
    option.geo.map = geoMapName;
    return option;
}

// 原LineAndHistogram
function barLines(arg) {
    
    const { yAxisConfig, xAxisData, seriesData } = arg;

    yAxisConfig.forEach((item) => {
        item.type = 'value';
        item.scale = true;
        item.boundaryGap = [0, 0];
        item.nameTextStyle = {
            color: '#BFDAED'
        };
        item.axisLabel.textStyle = {
            color: '#fff'
        }
    });

    seriesData.forEach((item) => {
        if (item.type === 'bar') {
            item.itemStyle = {
                normal: {
                    barBorderRadius: 4,
                    opacity: '0.8'
                },
                emphasis: {
                    opacity: '1'
                }
            };
            item.animationEasing = 'elasticOut';
            item.animationDelay = function(idx) {
                return idx * 10
            };
            item.animationDelayUpdate = function(idx) {
                return idx * 10
            };
        }
    })

    const legendData = seriesData.map((item) => { return item.name });

    const option = {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: legendData,
            textStyle: {
                color: '#BFDAED'
            },
        },
        grid: {
            top: 60,
            left: 50,
            right: 50,
            bottom: 30
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: xAxisData,
            nameTextStyle: {
                color: '#BFDAED'
            },
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            }
        }],
        yAxis: yAxisConfig,
        series: seriesData
    };
    return option;
}

// 动态折柱线
function dynamicChart(arg) {
    function fetchNewDate () {
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
        let newOption = Object.assign({}, option);
        newOption.series.map((item, i)=>{
            item.data.shift();
            item.data.push(item.type === 'line' ? Math.round(Math.random() * 10) : (Math.random() * 10 + 5).toFixed(1) - 0)
            return item.data
        })
        newOption.xAxis[0].data.shift();
        newOption.xAxis[0].data.push(axisData);
    }
    const { dynamicSeries, dynamicXAxis, dynamicYAxis } = arg;
    const yAixsConf = dynamicYAxis.map((item) => {
        item.type = 'value';
        item.scale = true;
        item.nameTextStyle = { color: '#BFDAED' };
        item.boundaryGap = [0.2, 0.2];
        item.axisLabel = { textStyle : { color: '#fff' } };
        return item;
    });
    const xAixsConf = dynamicXAxis.map((item) => {
        item.type = 'category';
        item.boundaryGap = true;
        item.axisLabel = { textStyle : { color: '#fff' } };
        return item;
    });
    const legendData = dynamicSeries.map((item, i) => { return item.name });
    dynamicSeries.forEach((item) => {
        if (item.type === 'bar') {
          item.itemStyle = {
              normal: { barBorderRadius: 4, opacity: '0.8' },
              emphasis: { opacity: '1' }
          };
          item.animationEasing = 'elasticOut';
          item.animationDelay = function (idx) { return idx * 10 };
          item.animationDelayUpdate = function (idx) { return idx * 10 };
        }
    });
    const option = {
        tooltip: { trigger: 'axis' },
        legend: { data: legendData, textStyle: { color: '#fff' } },
        grid: { top: 60, left: 50, right: 50, bottom:30 },
        xAxis: xAixsConf,
        yAxis: yAixsConf,
        series: dynamicSeries
    };
    setInterval(fetchNewDate(), 3000);
    return option;
}

// 雷达图
function radarChart(arg) {
    const { radarSeries, radarIndicator } = arg;
    radarSeries.type = 'radar';
    const legendData = radarSeries.data.map((item) => { return item.name });
    const option = {
        legend: {
            data: legendData,
            textStyle: { color: '#fff' },
        },
        radar: radarIndicator,
        series: radarSeries
    };
    option.radar.center = ['50%', '65%'];
    return option;
}

// 微博大数据
function weiboData(arg) {
    const weiboData = arg;
    const option = {
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
    weiboData.map(function (serieData, idx) {
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
    return option;
}



function echartsOption(data, name) {
    switch(name) {
        case 'SalesVolume':
            return blockArea(data);
        case 'AirportCoordComponent':
            return airportCoord(data);
        case 'BarLines':
            return barLines(data);
        case 'DynamicChart':
            return dynamicChart(data);
        case 'RadarChart':
            return radarChart(data);
        case 'WeiboData':
            return weiboData(data);
        default :
            return;
    }
}

export default echartsOption;
