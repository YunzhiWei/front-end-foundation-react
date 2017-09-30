import echarts from 'echarts';
import geoCoordMap from '../BigData/data/geoCoordMap';

function fortyBoatsData(arg) {
    function createSeries() {
        var count = 0;
        var series = [];
        var position = [2.5, 25]
        arg.map((item, i) => {
            // 超过20个换行
            i === 20 ? position = [-97.5, 75] : '';
            series.push(Object.assign({},seriesTemp));
            series[i].name = `游船${i+1}号`;
            series[i].center = [`${position[0] + count}%`, `${position[1]}%`];
            series[i].data = [{
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '34',
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 40
                    }
                }
            }, {
                name: 'invisible',
                itemStyle: placeHolderStyle,
                label: {
                    normal: {
                        formatter: (data) => 100 - data.data.value + '%',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '34',
                        }
                    }
                },
            }]
            series[i].data[0].value = item;
            series[i].data[1].value = 100 - item;
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
        radius: [100, 120],
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
        case 'FortyBoats':
            return fortyBoatsData(data);
        default :
            return;
    }
}

export default echartsOption;