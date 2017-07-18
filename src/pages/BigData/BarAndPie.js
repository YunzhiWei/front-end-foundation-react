import React, { Component } from 'react';
import ReactEcharts from './lib';

class BarAndPie extends Component {
    render() {
        const { barJson, pieJson } = this.props.barAndPieArray;

        const option = {
            title: [{
                text: barJson.name,
                textStyle: {
                    color: '#9FDAFF'
                },
                subtext: '总计 ' + Object.keys(barJson.data).reduce(function (all, key) {
                    return all + barJson.data[key];
                }, 0),
                x: '25%',
                textAlign: 'center'
            }, {
                text: pieJson.name,
                textStyle: {
                    color: '#9FDAFF'
                },
                subtext: '总计 ' + Object.keys(pieJson.data).reduce(function (all, key) {
                    return all + pieJson.data[key];
                }, 0),
                x: '75%',
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
                max: barJson.all,
                splitLine: { show: false },
                axisLine: {show: false },
                axisLabel: {interval: 0, textStyle: {color: '#ddd'}}
            }],
            yAxis: [{
                type: 'category',
                data: Object.keys(barJson.data),
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
                    data: Object.keys(barJson.data).map(function (key) {
                        return barJson.data[key];
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
                    data: Object.keys(barJson.data).map(function (key) {
                        return barJson.all - barJson.data[key];
                    })
                }, {
                    type: 'pie',
                    radius: [0, '40%'],
                    center: ['75%', '50%'],
                    data: Object.keys(pieJson.data).map(function (key) {
                        console.log(key);
                        return {
                            name: key.replace('.js', ''),
                            value: pieJson.data[key]
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