import React,{ Component } from 'react';
import ReactEcharts from './lib';

function fetchNewDate () {
    let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
    let option = Object.assign({}, this.state.option);
    option.series.map((item, i)=>{
        item.data.shift();
        item.data.push(item.type === 'line' ? Math.round(Math.random() * 10) : (Math.random() * 10 + 5).toFixed(1) - 0)
        return item.data
    })
    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    this.setState({option: option});
}

class DynamicChartComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { option: {}, timeTicket: null }
    }
    componentWillMount() {
        const { dynamicSeries, dynamicXAxis, dynamicYAxis } = this.props;
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
            return item.name;
        });
        dynamicSeries.forEach((item) => {
            if (item.type === 'bar') {
              item.itemStyle = {
                  normal: { barBorderRadius: 4, opacity: '0.8' },
                  emphasis: { opacity: '1' }
              };
              item.animationEasing = 'elasticOut';
              item.animationDelay = function (idx) { return idx * 10 };
              item.animationDelayUpdate = function (idx) { return idx * 10 };
            }
        });
        const option = {
            tooltip: { trigger: 'axis' },
            legend: { data: legendData, textStyle: { color: '#fff' } },
            grid: { top: 60, left: 30, right: 60, bottom:30 },
            xAxis: xAixsConf,
            yAxis: yAixsConf,
            series: dynamicSeries
        };
        this.setState({ option: option });
    }
    componentDidMount() {
        this.state.timeTicket && clearInterval(this.state.timeTicket);
        this.setState({ timeTicket: setInterval(fetchNewDate.bind(this), 5000) });
    }
    componentWillUnmount() {
        this.state.timeTicket && clearInterval(this.state.timeTicket);
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
