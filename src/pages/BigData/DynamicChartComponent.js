import React,{ Component } from 'react';
import ReactEcharts from './lib';


class DynamicChartComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            option: this.getOption(),
            timeTicket: null,
            count: 51
        }
    }
    fetchNewDate () {
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
        let option = this.state.option;
        let data0 = option.series[0].data;
        let data1 = option.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 10));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        option.xAxis[1].data.shift();
        option.xAxis[1].data.push(this.state.count++);
        this.setState({option: option});
    }
    
    componentDidMount() {
        if (this.state.timeTicket) {
            clearInterval(this.state.timeTicket);
        }
        this.state.timeTicket = setInterval(this.fetchNewDate.bind(this), 5000);
    }
    componentWillUnmount() {
        if (this.state.timeTicket) {
            clearInterval(this.state.timeTicket);
        }
    }
    getOption() {
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['游客数量', '游船数量'],
                textStyle: { color: '#fff' },
            },
            grid: {
                top: 60,
                left: 30,
                right: 60,
                bottom:30
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            visualMap: {
                show: false,
                min: 0,
                max: 1000,
                color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
                        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
                        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function (){
                        let now = new Date();
                        let res = [];
                        let len = 50;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })(),
                    axisLabel: { textStyle: { color: '#fff' } }
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function (){
                        let res = [];
                        let len = 50;
                        while (len--) {
                            res.push(50 - len + 1);
                        }
                        return res;
                    })(),
                    axisLabel: { textStyle: { color: '#fff' } }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '入园游客数量',
                    nameTextStyle: { color: '#BFDAED' },
                    max: 20,
                    min: 0,
                    boundaryGap: [0.2, 0.2],
                    axisLabel: { textStyle: { color: '#fff' } }
                },
                {
                    type: 'value',
                    scale: true,
                    name: '码头游船数量',
                    nameTextStyle: { color: '#BFDAED' },
                    max: 12,
                    min: 0,
                    boundaryGap: [0.2, 0.2],
                    axisLabel: { textStyle: { color: '#fff' } }
                }
            ],
            series: [
                {
                    name:'码头游船数量',
                    type:'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 4,
                        }
                    },
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return idx * 10;
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * 10;
                    },
                    data:(function (){
                        let res = [];
                        let len = 50;
                        while (len--) {
                            res.push(Math.round(Math.random() * 10));
                        }
                        return res;
                    })()
                },
                {
                    name:'入园游客数量',
                    type:'line',
                    data:(function (){
                        let res = [];
                        let len = 0;
                        while (len < 50) {
                            res.push((Math.random()*10 + 5).toFixed(1) - 0);
                            len++;
                        }
                        return res;
                    })()
                }
            ]
        };

        return option;
    }
    render() {
        return (
            <div className='examples'>
                <div className='parent' style={{position: 'relative'}}>
                    <ReactEcharts ref='echarts_react'
                        option={this.state.option}
                        style={{height: 400,width: 850,margin: '0 0 0 -50%',left: '50%'}} />
                </div>
            </div>
        );
    }
};

export default DynamicChartComponent;
