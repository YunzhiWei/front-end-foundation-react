import React, { Component } from 'react';
import ReactEcharts from './lib';

class BarAndPie extends Component {
    render() {

        var builderJson = {
                  "all": 10887,
                  "charts": {
                    "map": 3237,
                    "lines": 2164,
                    "bar": 7561,
                    "line": 7778,
                    "pie": 7355,
                    "scatter": 2405,
                    "candlestick": 1842,
                    "radar": 2090,
                    "heatmap": 1762,
                    "treemap": 1593
                  }
                };

                var downloadJson = {
                  "echarts.min.js": 17365,
                  "echarts.simple.min.js": 4079,
                  "echarts.common.min.js": 6929,
                  "echarts.js": 14890
                };

        const option = {
            tooltip: {},
            title: [{
                text: '在线构建',
                textStyle: {
                    color: '#9FDAFF'
                },
                subtext: '总计 ' + builderJson.all,
                x: '25%',
                textAlign: 'center'
            }, {
                text: '各版本下载',
                textStyle: {
                    color: '#9FDAFF'
                },
                subtext: '总计 ' + Object.keys(downloadJson).reduce(function (all, key) {
                    return all + downloadJson[key];
                }, 0),
                x: '80%',
                textAlign: 'center'
            }],
            grid: [{
                top: 50,
                width: '50%',
                height: '80%',
                bottom: '45%',
                left: 10,
                containLabel: true
            }, {
                top: '55%',
                width: '50%',
                height: '80%',
                bottom: 0,
                left: 10,
                containLabel: true
            }],
            xAxis: [{
                type: 'value',
                max: builderJson.all,
                splitLine: { show: false },
                axisLine: {show: false },
                axisLabel: {interval: 0, textStyle: {color: '#ddd'}}
            }],
            yAxis: [{
                type: 'category',
                data: Object.keys(builderJson.charts),
                splitLine: { show: false },
                axisLine: {show: false  },
                axisLabel: {interval: 0, rotate: 30, textStyle: {color: '#ddd'}}
            }],
            series: [
                {
                    type: 'bar',
                    stack: 'chart',
                    z: 3,
                    label: {
                        normal: {
                            position: 'right',
                            show: true
                        }
                    },
                    data: Object.keys(builderJson.charts).map(function (key) {
                        return builderJson.charts[key];
                    })
                }, {
                    type: 'bar',
                    stack: 'chart',
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: '#eee'
                        }
                    },
                    data: Object.keys(builderJson.charts).map(function (key) {
                        return builderJson.all - builderJson.charts[key];
                    })
                }, {
                    type: 'pie',
                    radius: [0, '40%'],
                    center: ['80%', '50%'],
                    data: Object.keys(downloadJson).map(function (key) {
                        return {
                            name: key.replace('.js', ''),
                            value: downloadJson[key]
                        }
                    })
                }
            ]
        }

        return (
            <div className='examples'>
                <div className='parent' style={{position: 'relative'}}>
                    <ReactEcharts
                        option={option}
                        style={{height: 400,width: 800,margin: '0 0 0 -50%',left: '50%'}} />
                </div>
            </div>
        );
    }
};

export default BarAndPie;