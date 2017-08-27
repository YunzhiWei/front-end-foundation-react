import echarts from 'echarts';
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
            fontSize: 40,
            color: '#BFDAED'
        };
        item.axisLabel.textStyle = {
            fontSize: 40,
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
        // legend: {
        //     data: legendData,
        //     textStyle: {
        //         fontSize: 40,
        //         color: '#BFDAED'
        //     },
        // },
        grid: {
            left: 250,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: xAxisData,
            nameTextStyle: {
                fontSize: 40,
                color: '#BFDAED'
            },
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                textStyle: {
                    fontSize: 40,
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
        // legend: {
        //     left: 'left',
        //     data: ['强', '中', '弱'],
        //     textStyle: {
        //         color: '#ccc'
        //     }
        // },
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

// 停车场监控
function parkingLotData(arg) {
    const { all, inUse } = arg;
    var pathSymbols = {
        car: 'path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-14.185-0.216 c-4.088,0-12.789,0.113-14.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,16.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z'
    };
    var labelSetting = {
        normal: {
            show: true,
            position: 'outside',
            offset: [20, 0],
            textStyle: {
                fontSize: 60,
            }
        }
    };
    const option = {
        tooltip: {
            trigger: 'axis',
            hideDelay: 400,
            formatter: '{a0}: {c0}<br />{a1}: {c1}',
            padding: 20,
            axisPointer: {
                type: 'none'
            },
            textStyle: {
                fontSize: 60,
            },
        },
        grid: {
            containLabel: true,
            left: 20
        },
        yAxis: {
            data: ['使用量：\n\n\n\n总量：'],
            inverse: true,
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
                margin: 30,
                align: 'center',
                textStyle: {
                    fontSize: 60,
                    color: '#fff'
                }
            }
        },
        xAxis: {
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: {show: false}
        },
        series: [{
            name: '使用量',
            type: 'pictorialBar',
            label: labelSetting,
            symbolRepeat: true,
            symbolSize: ['80%', '80%'],
            barCategoryGap: '2%',
            data: [{
                value: inUse,
                symbol: pathSymbols.car
            }]
        }, {
            name: '总量',
            type: 'pictorialBar',
            barGap: '120%',
            label: labelSetting,
            symbolRepeat: true,
            symbolSize: ['80%', '80%'],
            data: [{
                value: all,
                symbol: pathSymbols.car
            }]
        }]
    };
    return option;
}

// 天气预报
function weatherForeData(arg) {
    let aHigh = arg.future.map(function(item){
        return item.high;
    }).slice(0,7);
    aHigh.unshift('');
    let aLow = arg.future.map(function(item){
        return item.low;
    }).slice(0,7);
    aLow.unshift('');
    let aDay = arg.future.map(function(item){
        return item.day;
    }).slice(0,6);
    let bHigh = [arg.yesterday.high, arg.today.high];
    let bLow = [arg.yesterday.low, arg.today.low];
    let time = [arg.yesterday.day];
    time.push.apply(time, aDay);
    const option = {
        tooltip: {
            padding: 20,
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                snap: true,
                lineStyle: {
                    color: '#57617B'
                },
                label: {
                    textStyle: {
                        fontSize: 25
                    }
                }
            },
            showContent: false
        },
        legend: {
            icon: 'pin',
            itemGap: 50,
            data: ['过去1天', '未来5天'],
            right: '4%',
            textStyle: {
                fontSize: 30,
                color: '#F1F1F3'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                align: 'center',
                textStyle: {
                    fontSize: 25,
                    color: '#999'
                }
            },
            data: time
        }],
        yAxis: [{
            type: 'value',
            min: arg.min - 5,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                margin: 10,
                align: 'center',
                textStyle: {
                    fontSize: 25,
                    color: '#999'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [{
            name: '未来5天',
            type: 'line',
            smooth: true,
            symbolSize: 15,
            symbol:'circle',
            lineStyle: {
                normal: {
                    width: 5,
                    type: 'dashed'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 15
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(137,189,27)',
                    label: {
                        show: true,
                        position: 'top',
                        offset: [35, 0],
                        distance: 20,
                        textStyle: {
                            fontSize: 30,
                        },
                        formatter: function(p) {
                            return p.dataIndex === 1 ? '' : p.value > 0 ? p.value + ' ℃' : '';
                        }
                    }
                }
            },
            connectNulls: true,
            data: aHigh
        }, {
            name: '过去1天',
            type: 'line',
            smooth: true,
            symbolSize: 15,
            symbol:'circle',
            z: 10,
            lineStyle: {
                normal: {
                    width: 5
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 15
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)',
                    label: {
                        show: true,
                        position: 'top',
                        offset: [35, 0],
                        distance: 20,
                        textStyle: {
                            fontSize: 30,
                        },
                        formatter: function(p) {
                            return p.value > 0 ? p.value + ' ℃' : '';
                        }
                    }
                }
            },
            data: bHigh
        }, {
            name: '过去1天',
            type: 'line',
            smooth: true,
            symbolSize: 15,
            symbol:'circle',
            z: 10,
            lineStyle: {
                normal: {
                    width: 5
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 15
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)',
                    label: {
                        show: true,
                        position: 'bottom',
                        offset: [35, 0],
                        distance: 20,
                        textStyle: {
                            fontSize: 30,
                        },
                        formatter: function(p) {
                            return p.value > 0 ? p.value + ' ℃' : '';
                        }
                    }
                }
            },
            data: bLow
        }, {
            name: '未来5天',
            type: 'line',
            smooth: true,
            symbolSize: 15,
            symbol:'circle',
            lineStyle: {
                normal: {
                    width: 5,
                    type: 'dashed'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 15
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(137,189,27)',
                    label: {
                        show: true,
                        position: 'bottom',
                        offset: [30, 0],
                        distance: 20,
                        textStyle: {
                            fontSize: 30,
                        },
                        formatter: function(p) {
                            return p.dataIndex === 1 ? '' : p.value > 0 ? p.value + ' ℃' : '';
                        }
                    }
                }
            },
            connectNulls: true,
            data: aLow
        }]
    }
    return option;
}

// 出入游客数量
function numOfPassData(arg) {
    // option
    const option = {
        tooltip: {
            trigger: 'axis',
            hideDelay: 400,
            padding: 20,
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 60,
            },
        },
        legend: {
            data: ['line', 'bar'],
            textStyle: {
                color: '#ccc'
            }
        },
        xAxis: {
            data: arg.category.map(function(item){ return item }),
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                align: 'center',
                textStyle: {
                    fontSize: 25,
                    color: '#999'
                }
            }
        },
        yAxis: {
            splitLine: {show: false},
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                align: 'center',
                textStyle: {
                    fontSize: 25,
                    color: '#999'
                }
            }
        },
        series: [{
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            animation: true,
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 10 },
            animationDelayUpdate: function (idx) { return idx * 10 },
            data: arg.lineData.map(function(item){ return item })
        }, {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            animation: true,
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 10 },
            animationDelayUpdate: function (idx) { return idx * 10 },
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#14c8d4'},
                            {offset: 1, color: '#43eec6'}
                        ]
                    )
                }
            },
            data: arg.barData.map(function(item){ return item })
        }, {
            name: 'line',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            animation: true,
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 10 },
            animationDelayUpdate: function (idx) { return idx * 10 },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(20,200,212,0.5)'},
                            {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                            {offset: 1, color: 'rgba(20,200,212,0)'}
                        ]
                    )
                }
            },
            z: -12,
            data: arg.lineData.map(function(item){ return item })
        }, {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            animation: true,
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 10 },
            animationDelayUpdate: function (idx) { return idx * 10 },
            itemStyle: {
                normal: {
                    color: '#0f375f'
                }
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: arg.lineData.map(function(item){ return item })
        }]
    };
    return option;
}

// 空气质量
function airQualityData(arg) {
    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                Math.round(value)
            ]
        }
    }

    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }

    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        grid: [
            {x: '5%', y: '5%', width: '50%', height: '80%'}
        ],
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                align: 'center',
                textStyle: {
                    fontSize: 25,
                    color: '#999'
                }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                align: 'center',
                textStyle: {
                    fontSize: 25,
                    color: '#999'
                }
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        },{
                name:'PM2.5',
                type:'gauge',
                center : ['80%', '50%'],
                min:0,
                max:500,
                splitNumber:10,
                radius: '80%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.1, 'lime'],[150/500, '#1e90ff'],[1, '#ff4500']],
                        width: 10,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 15
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 15
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :25,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 15
                    }
                },
                splitLine: {           // 分隔线
                    length :35,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:6,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 15
                    }
                },
                pointer: {           // 分隔线
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 50,
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 15
                    }
                },
                detail : {
                    backgroundColor: 'rgba(30,144,255,0.8)',
                    borderWidth: 3,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10,
                    height: 60,
                    width: 120,
                    offsetCenter: [0, '50%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 45,
                        color: '#fff'
                    }
                },
                data:[{value: 40, name: 'PM2.5'}]
            }]
    };
    return option;
}

// 资源使用量
function resUtilizationData(argument) {
    var appusage_data = [{
        name: "app4",
        value: 34
    }, {
        name: "app11",
        value: 46
    }, {
        name: "app8",
        value: 53
    }, {
        name: "app3",
        value: 68
    }, {
        name: "app16",
        value: 79
    }];
    const option = {
        "tooltip": {
            "trigger": "axis",
            "axisPointer": { // 坐标轴指示器，坐标轴触发有效
                "type": "shadow" // 默认为直线，可选为："line" | "shadow"
            }
        },
        "grid": {
            "left": "3%",
            "right": "10%",
            "bottom": "3%",
            "containLabel": true
        },
        "yAxis": [{
            "type": "category",
            "data": ["TOP5", "TOP4", "TOP3", "TOP2", "TOP1"],
            "axisLine": {
                "show": false
            },
            "axisTick": {
                "show": false,
                "alignWithLabel": true
            },
            "axisLabel": {
                "margin": 30,
                "textStyle": {
                    "fontSize": 40,
                    "color": "#ffb069"
                }
            }
        }],
        "xAxis": [{
            "type": "value",
            "axisLine": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "axisLabel": {
                "show": false
            },
            "splitLine": {
                "show": false
            }
        }],

        "series": [{
            "name": "应用使用率",
            "type": "bar",
            "data": appusage_data,
            "barCategoryGap": "35%",
            "label": {
                "normal": {
                    "show": true,
                    "position": "right",
                    "formatter": function(params) {
                        return params.data.name;
                    },
                    "textStyle": {
                        "fontSize": 40,
                        "color": "#bcbfff" //color of value
                    }
                }
            },
            "itemStyle": {
                "normal": {
                    "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        "offset": 0,
                        "color": "rgba(0, 136, 212, 0.6)" // 0% 处的颜色
                    }, {
                        "offset": 1,
                        "color": "rgba(30, 144, 255, 0.9)" // 100% 处的颜色
                    }], false)
                }
            }
        }]
    };
    return option;
}

// 热力图
function heatMapDData(argument) {
    // 仙女湖（27.711067, 114.798137）.
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
        case 'ParkingLot':
            return parkingLotData(data);
        case 'WeatherFore':
            return weatherForeData(data);
        case 'NumOfPass':
            return numOfPassData(data);
        case 'AirQuality':
            return airQualityData(data);
        case 'ResUtilization':
            return resUtilizationData(data);
        default :
            return;
    }
}

export default echartsOption;
