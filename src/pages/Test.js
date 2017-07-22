import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';

import LineAndHistogram from './BigData/LineAndHistogram';

@inject("chartdata") @observer
class TestPage extends Component {
  render() {
    const {chartdata} = this.props;

    const bardata = toJS(chartdata.chartdata);
    // bardata.seriesData[0].data = chartdata.income.map((item) => {
    //   return item;
    // });
    // // console.log("data", bardata.seriesData.data);
    // console.log("data", bardata);

    return (
      <div className="AboutPage">
        <h2>This is the Test Page</h2>
        <p>
          income:
          <span> {chartdata.income} </span>
        </p>
        <div>
          <LineAndHistogram	BarLinesData={bardata}	/>
        </div>
      </div>
    );
  }
}

export default TestPage;
