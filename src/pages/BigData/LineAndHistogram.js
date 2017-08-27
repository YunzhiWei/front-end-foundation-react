import React,{ Component } from 'react';
import ReactEcharts from './lib';
import echartsOption from '../function/function';

class LineAndHistogram extends Component {
    render() {
      const option = echartsOption(this.props.BarLinesData, 'BarLines');
      return (
          <ReactEcharts
            option={option}
            style={{width: '100%',height: '100%'}}
            className='BarLines'
          />
      );
    }
};

export default LineAndHistogram;
