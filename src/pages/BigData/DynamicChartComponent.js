import React,{ Component } from 'react';
import ReactEcharts from './lib';

function extendObject(target, source) {
    var newObj = new Object();
    for (var obj in target) newObj[obj] = target[obj];
    for (var obj in source) newObj[obj] = source[obj];
    return newObj;
}

class DynamicChartComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = { option: {}, timeTicket: null }
    }
    fetchNewDate () {
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
        let option = this.state.option;
        let data0 = option.series[0].data;
        let data1 = option.series[1].data;
        let data2 = option.series[2].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 10));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
        data2.shift();
        data2.push(Math.round(Math.random() * 10));
        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        this.setState({option: option});
    }
    componentWillMount() {
        const { dynamicSeries, dynamicXAxis, dynamicYAxis } = this.props;
        var series = [];
        const seriesBar = {
            itemStyle: { 
                normal: { color: '#0ff', barBorderRadius: 4, opacity: '0.6' },
                emphasis: { opacity: '1' }
            },
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 10 },
            animationDelayUpdate: function (idx) { return idx * 10 }
        };
        const seriesLine = {
            itemStyle: { normal: { color: '#ffe729' } }
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
            console.log(seriesBar);
            console.log(item);
            series[i] = extendObject(item.type == 'bar' ? seriesBar : seriesLine, item);
            console.log(series[0].name)
            return item.name;
        });
        console.log(series);
        const option = {
            tooltip: { trigger: 'axis' },
            legend: { data: legendData, textStyle: { color: '#fff' } },
            grid: { top: 60, left: 30, right: 60, bottom:30 },
            xAxis: xAixsConf,
            yAxis: yAixsConf,
            series: series
        };
        this.setState({ option: option });
    }
    componentDidMount() {
        this.state.timeTicket ? clearInterval(this.state.timeTicket) : '';
        this.state.timeTicket = setInterval(this.fetchNewDate.bind(this), 5000);
    }
    componentWillUnmount() {
        this.state.timeTicket ? clearInterval(this.state.timeTicket) : '';
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
