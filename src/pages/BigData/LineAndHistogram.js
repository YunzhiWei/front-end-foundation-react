import React,{ Component } from 'react';
import ReactEcharts from './lib';

class LineAndHistogram extends Component {
    render() {
      const {yAxisConfig, legendData, xAxisData, seriesData} = this.props.BarLinesData;

      yAxisConfig.forEach((item) => {
        item.type = 'value';
        item.nameTextStyle = { color: '#BFDAED' };
        item.axisLabel.textStyle = { color: '#fff' }
      });

      const option = {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: { color: '#999' }
          }
        },
        legend: {
          data: legendData,
          textStyle: { color: '#BFDAED' },
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            nameTextStyle: { color: '#BFDAED' },
            axisPointer: { type: 'shadow' },
            axisLabel: { textStyle: { color: '#fff' } }
          }
        ],
        yAxis: yAxisConfig,
        series: seriesData
      };

      return (
        <div className='examples'>
          <div className='parent' style={{position: 'relative'}}>
            <ReactEcharts
              option={option}
              style={{width: '400px',height: '400px',margin: '0 0 0 -50%',left: '50%'}}
              className='react_for_echarts' />
          </div>
        </div>
      );
    }
};

export default LineAndHistogram;
