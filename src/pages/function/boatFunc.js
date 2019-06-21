import echarts from 'echarts';
import geoCoordMap from '../BigData/data/geoCoordMap';

function boatsListData(arg) {
    const { _boatsList, _boatUsageAmount } = arg;
    function createSeries() {
        var count = 0;
        var series = [];
        var position = [2.5, 25]
        _boatsList.map((item, i) => {
            // 超过20个换行
            i === 20 ? position = [-97.5, 75] : '';
            series.push(Object.assign({},seriesTemp));
            series[i].name = item.device_name;
            series[i].center = [`${position[0] + count}%`, `${position[1]}%`];
            series[i].data = [{
                label: {
                    normal: {
                        formatter: (data) => data.seriesName.slice(0, 6),
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: 14,
                            margin: [0,0,5,0]
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10
                    }
                }
            }, {
                name: 'invisible',
                itemStyle: placeHolderStyle,
                label: {
                    normal: {
                        formatter: (data) => (100 - data.data.value).toFixed(2) + '%',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: 16,
                        }
                    }
                },
            }]
            series[i].data[0].value = (item.usage_amount/_boatUsageAmount) * 100;
            series[i].data[1].value = 100 - (item.usage_amount/_boatUsageAmount) * 100;
            series[i].data[0].label.normal.textStyle.color = series[i].data[1].label.normal.textStyle.color = series[i].data[0].itemStyle.normal.color= series[i].data[0].itemStyle.normal.shadowColor = color;
            count += 5;
        })
        return series;
    }
    var color = '#3dd4de';
    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
        }
    };
    var placeHolderStyle = {
        normal: {
            color: 'rgba(44,59,70,1)',
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(44,59,70,1)'
        }
    };
    var seriesTemp =  {
        type: 'pie',
        clockWise: false,
        radius: [38, 42],
        itemStyle: dataStyle,
        hoverAnimation: false,
    }
    const option = {
        tooltip: {
            show: false,
        }
    }
    option.series = createSeries();
    return option;
}

function echartsOption(data, name) {
    switch(name) {
        case 'BoatsList':
            return boatsListData(data);
        default :
            return;
    }
}

export default echartsOption;