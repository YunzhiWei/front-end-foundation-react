import echarts from 'echarts';
import geoCoordMap from '../BigData/data/geoCoordMap';

// 省内车源分布（地图）
function carsDistributionData(arg) {
    const {geoMapName, visualMin, visualMax, visualLabel, mapDataSeries} = arg;
    var series = [];
    mapDataSeries.map((item, i) => {
        series[i] = {};
        series[i].data = [];
        item.data.map((ele) => {
            series[i].data.push(ele);
        });
        series[i].name = item.name;
        series[i].type = "map";
        series[i].mapType = geoMapName;
        series[i].label = {
            normal: {
                show: true,
                textStyle: {
                    color: '#0',
                    fontSize: 32
                }
            }
        };
    });
    const legendData = mapDataSeries.map((item) => { var temp = item.name; return { name: temp, icon: 'circle' }});
    const option = {
        color: ['rgb(38, 242, 233)','rgb(64, 201, 240)', 'rgb(30, 144, 255)'],
        tooltip: { trigger: 'none' },
        legend: { 
            top: 50,
            left: 'center',
            selectedMode: 'single',
            textStyle: { color: '#f', fontSize: 46},
            itemWidth: 30,
            itemHeight: 30,
            itemGap: 30
        },
        visualMap: {
            right: 'right',
            bottom: 50,
            calculable: true,
            textStyle: { color: 'rgb(38, 242, 233)',fontSize: 46 },
            inRange: {
                color: ['#05bcfa','#0a64a9'],
            },
            itemWidth: 60,
            itemHeight: 280
        },
        geo: { 
            roam: false,
            type: 'map',
            map: '',
            itemStyle: {
                normal: { color: 'rgba(5, 188, 250, .8)' },
            }
        },
        series: series
    }
    option.legend.data = legendData;
    option.visualMap.min = visualMin;
    option.visualMap.max = visualMax;
    option.visualMap.text = visualLabel;
    option.geo.map = geoMapName;
    return option;
}

// 省内车源分布（柱状图）
function carsDistribution2Data(arg) {
    var val = [];
    var order = [];
    var max;
    var maxs = [];
    var sum = 0;
    arg.map((item) => {
        order.push(item);
        sum+=item.value;
        return item.value;
    });
    order = order.sort((a, b) => b.value - a.value);
    max = order[0].value;
    val = order.slice(0,5).map((item, i) => {
        maxs[i] = max
        return item.value
    });
    
    const option = {
        grid: {
            top: 60,
            left: 30
        },
        xAxis: {
            type: 'value',
            position: 'top',
            max: max,
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 32,
                    color: 'rgba(31, 188, 210, .9)',
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false,
            },
            data: maxs
        },
        series: [{
            type: 'bar',
            silent: true,
            barGap: '-100%',
            barWidth: 50,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 63, 126)',
                    barBorderRadius: 50,
                }
            },
            data: maxs
        }, {
            type: 'bar',
            silent: true,
            barGap: '-100%',
            barWidth: 50,
            itemStyle: {
                normal: {
                    color: 'rgba(71, 216, 253, .9)',
                    barBorderRadius: 50,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    // formatter: function(data) {
                    //     return (data.data/sum).toFixed(2) + '%'
                    // },
                    formatter: function(data) {
                        var len = val.length;
                        return order[len - data.dataIndex -1].name
                    },
                    textStyle: {
                        fontSize: 30
                    }
                }
            },
            data: val.reverse(),
        }]
    }
    return option;
}

// 全国车辆分布图
function radarChartData(arg) {
    var dataReal = [[75, 66, 30, 49, 23, 69]];
    var dataPre = [[81, 71, 41, 42, 23, 67]];
    var dataYes = [[88, 79, 67, 51, 26, 31]];

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };

    const option = {
        legend: {
            bottom: 5,
            data: ['实时', '昨日', '前日'],
            itemGap: 20,
            textStyle: {
                color: '#87baf8',
                fontSize: 40
            },
            // selectedMode: 'single'
        },
        radar: {
            indicator: [
                {name: '龙王岛', max: 100},
                {name: '爱情岛', max: 100},
                {name: '洪阳洞', max: 100},
                {name: '桃花岛', max: 100},
                {name: '舞龙湖', max: 100},
                {name: '昌山庙', max: 100}
            ],
            shape: 'circle',
            splitNumber: 5,
            radius: '75%',
            center: ['50%', '45%'],
            name: {
                textStyle: {
                    color: '#43eec6',
                    fontSize: 40
                }
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(182, 251, 255, 0.2)', 'rgba(169, 228, 244, 0.4)',
                        'rgba(157, 208, 234, 0.6)', 'rgba(151, 198, 229, 0.7)',
                        'rgba(141, 181, 220, 0.9)', 'rgba(131, 164, 212, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(141, 181, 220, 0.5)'
                }
            }
        },
        series: [
            {
                name: '实时',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataReal,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#14c8d4'},
                                {offset: 1, color: '#43eec6'}
                            ]
                        )
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
            {
                name: '昨日',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataYes,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#B3E4A1'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.05
                    }
                }
            },
            {
                name: '前日',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataPre,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: 'rgb(238, 197, 102)'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.05
                    }
                }
            }
        ]
    };
    return option;
}

function IOCarsData(arg) {
    
}

function echartsOption(data, name) {
    switch(name) {
        case 'CarsDistribution':
            return carsDistributionData(data);
        case 'CarsDistribution2':
            return carsDistribution2Data(data);
        case 'RadarChart':
            return radarChartData(data);
        case 'IOCars':
            return IOCarsData(data);
        default :
            return;
    }
}

export default echartsOption;