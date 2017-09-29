import echarts from 'echarts';
import geoCoordMap from '../BigData/data/geoCoordMap';

function fortyBoatsData(arg) {
    function createSeries() {
        var count = 0;
        var series = [];
        var position = [2.5, 25]
        value.map((item, i) => {
            // 超过20个换行
            i === 20 ? position = [-97.5, 75] : '';
            series.push(Object.assign({},seriesTemp));
            series[i].name = `boat${i}`;
            series[i].center = [`${position[0] + count}%`, `${position[1]}%`];
            series[i].data = [{
                label: {
                    normal: {
                        formatter: '{a}\n{d}%',
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
            }]
            series[i].data[0].value = value[i];
            series[i].data[0].label.normal.textStyle.color = series[i].data[0].itemStyle.normal.color= series[i].data[0].itemStyle.normal.shadowColor = color;
            series[i].data[1].value = 100 - value[i];
            count += 5;
        })
        return series;
    }
    var value = [81, 30, 88, 17, 60, 97, 62, 47, 10, 39, 83, 48, 23, 81, 19, 78, 95, 18, 87, 92, 50, 45, 58, 37, 55, 30, 78, 31, 61, 75, 88, 13, 93, 31, 71, 80, 72, 66, 38, 31]
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
        radius: [105, 120],
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