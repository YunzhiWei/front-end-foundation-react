import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactEcharts from '../lib';
import echartsOption from '../function/function';

@inject("bigDataAnlsData") @observer
class LineAndHistogram extends Component {
    render() {
      const { _nationalRanking } = this.props.bigDataAnlsData; 
      const option = echartsOption(_nationalRanking[0], 'BarLines');
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
