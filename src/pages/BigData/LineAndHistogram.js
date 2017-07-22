import React,{ Component } from 'react';
import ReactEcharts from './lib';
import echarts from 'echarts';

class LineAndHistogram extends Component {
    render() {
      // console.log("LineAndHistogram render +");

      const {yAxisConfig, xAxisData, seriesData} = this.props.BarLinesData;

      const legendData = seriesData.map((item) => {
          return item.name;
      });

      yAxisConfig.forEach((item) => {
        item.type = 'value';
        item.scale = true;
        item.boundaryGap = [0, 0];
        item.nameTextStyle = { color: '#BFDAED' };
        item.axisLabel.textStyle = { color: '#fff' }
      });

      seriesData.forEach((item) => {
        if (item.type === 'bar') {
          item.itemStyle = {
              normal: { barBorderRadius: 4, opacity: '0.8' },
              emphasis: { opacity: '1' }
          };
          item.animationEasing = 'elasticOut';
          item.animationDelay = function (idx) { return idx * 10 };
          item.animationDelayUpdate = function (idx) { return idx * 10 };
        }
      })

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
        grid: { top: 60, left: 30, right: 60, bottom:30 },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: xAxisData,
            nameTextStyle: { color: '#BFDAED' },
            axisPointer: { type: 'shadow' },
            axisLabel: { textStyle: { color: '#fff' } }
          }
        ],
        yAxis: yAxisConfig,
        series: seriesData
      };

      // console.log("Histogram option: ", option);

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
