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
            right: 50,
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
function carsDistribution3Data(arg) {
    var datas = arg.map((item) => item)
    console.log(datas);
    const option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            textStyle: {
                fontSize: 42
            }
        },
        series : [
            {
                name: '全国客源车辆所属省份统计',
                type: 'pie',
                radius : '65%',
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 46
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: datas,
            }
        ]
    };
    return option;
}

// 车辆停留分布时间
function standingTimeData(arg) {
    var dataNames = arg.map((item) => item.name )
    var datas = arg.map((item) => item.value )
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
            }
        },
        grid: {
            left: 80,
            right: 50
        },
        legend: {
            data: ['增长趋势', '游客量'],
            textStyle: {
                color: '#ccc',
                fontSize: 40
            }
        },
        xAxis: {
            data: dataNames,
            boundaryGap: true,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                align: 'center',
                textStyle: {
                    fontSize: 32,
                    color: '#87baf8'
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
                    fontSize: 32,
                    color: '#87baf8'
                }
            }
        },
        series: [{
            name: '增长趋势',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            lineStyle: {
                normal: {
                    width: 5
                }
            },
            animation: true,
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 10 },
            animationDelayUpdate: function (idx) { return idx * 10 },
            data: datas
        }, {
            name: '游客量',
            type: 'bar',
            barWidth: 30,
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
                            {offset: 0, color: 'rgba(20,200,212, .8)'},
                            {offset: 1, color: 'rgba(67,238,198, .8)'}
                        ]
                    )
                }
            },
            data: datas
        }]
    };
    return option;
}


function IOCarsData(arg) {
    // http://gallery.echartsjs.com/editor.html?c=bar1
}

function echartsOption(data, name) {
    switch(name) {
        case 'CarsDistribution':
            return carsDistributionData(data);
        case 'CarsDistribution2':
            return carsDistribution2Data(data);
        case 'CarsDistribution3':
            return carsDistribution3Data(data);
        case 'StandingTime':
            return standingTimeData(data);
        case 'IOCars':
            return IOCarsData(data);
        default :
            return;
    }
}

export default echartsOption;