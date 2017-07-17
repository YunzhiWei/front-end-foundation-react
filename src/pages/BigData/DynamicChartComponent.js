import React,{ Component } from 'react';
import ReactEcharts from './lib';

function extend(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}

class DynamicChartComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            option: {},
            timeTicket: null,
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
        this.setState({option: option});
    }
    
    componentDidMount() {
        this.state.timeTicket ? clearInterval(this.state.timeTicket) : "";
        this.state.timeTicket = setInterval(this.fetchNewDate.bind(this), 5000);
    }
    componentWillUnmount() {
        this.state.timeTicket ? clearInterval(this.state.timeTicket) : "";
    }
    render() {
        const { dynamicSeries, dynamicXAxis, dynamicYAxis } = this.props;
        console.log(this.props);
        var series = [];
        const seriesBar = {
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#0ff',
                    barBorderRadius: 4,
                    opacity: '0.6'
                },
                emphasis: {
                    opacity: '1'
                }
            },
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return idx * 10;
            },
            animationDelayUpdate: function (idx) {
                return idx * 10;
            }
        };
        const seriesLine = {
            name:'游客数量',
            itemStyle: {
                normal: {
                    color: '#ffe729'
                }
            }
        }
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
        const legendData = dynamicSeries.map((item, i) => {
            series[i] = item.type == 'bar' ? extend(seriesBar, item) : extend(seriesLine, item);
            return item.name;
        });

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:legendData,
                textStyle: { color: '#fff' },
            },
            grid: {
                top: 60,
                left: 30,
                right: 60,
                bottom:30
            },
            xAxis: xAixsConf,
            yAxis: yAixsConf,
            series: series
        };
        this.setState({
            option: option
        })

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
